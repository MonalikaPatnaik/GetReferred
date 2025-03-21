import express, { RequestHandler } from 'express';
import { supabase } from '../config/supabase';

const router = express.Router();

// Check if referee email exists
const checkEmailExists: RequestHandler = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  try {
    // Check if the email exists in the referees table
    const { data, error } = await supabase
      .from('referees')
      .select('id')
      .eq('email', email);
    
    if (error) {
      console.error('Error checking referee email:', error);
      res.status(500).json({ error: `Database error: ${error.message}` });
      return;
    }

    res.status(200).json({ exists: data && data.length > 0 });
  } catch (error: any) {
    console.error('Server error checking referee email:', error);
    res.status(500).json({ error: error.message || 'Failed to check email' });
  }
};

// Create a new referee
const createReferee: RequestHandler = async (req, res) => {
  const { 
    full_name, 
    email, 
    phone, 
    linkedin_url,
    graduation_year,
    github_url,
    leetcode_url,
    codeforces_url,
    codechef_url,
    portfolio_links,
    otp 
  } = req.body;

  // Validate required fields
  if (!full_name || !email || !phone || !otp) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    // First verify the OTP
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    });

    if (error) {
      console.error('Error verifying OTP:', error);
      res.status(401).json({ error: `Error verifying OTP: ${error.message}` });
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'User ID not found after OTP verification' });
      return;
    }

    // OTP is valid, create the referee
    const { data: refereeData, error: refereeError } = await supabase
      .from('referees')
      .insert([
        { 
          uuid: userId, 
          full_name, 
          email, 
          phone_number: phone,
          linkedin_url,
          graduation_year,
          github_url,
          leetcode_url,
          codeforces_url,
          codechef_url,
          portfolio_links
        }
      ]);
    
    if (refereeError) {
      console.error('Error creating referee:', refereeError);
      res.status(500).json({ error: `Database error: ${refereeError.message}` });
      return;
    }

    res.status(201).json({ 
      message: 'Referee created successfully',
      referee: refereeData,
      session: data.session,
      userId
    });
  } catch (error: any) {
    console.error('Server error creating referee:', error);
    res.status(500).json({ error: error.message || 'Failed to create referee' });
  }
};

router.get('/check-email', checkEmailExists);
router.post('/create', createReferee);

export default router;
