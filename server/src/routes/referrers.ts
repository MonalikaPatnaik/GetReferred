import express, { RequestHandler } from 'express';
import { supabase } from '../config/supabase';

const router = express.Router();

// Check if referrer email exists
const checkEmailExists: RequestHandler = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  try {
    // Check if the email exists in the referrers table
    const { data, error } = await supabase
      .from('referrers')
      .select('uuid')  
      .eq('email_company', email);
    
    if (error) {
      console.error('Error checking referrer email:', error);
      res.status(500).json({ error: `Database error: ${error.message}` });
      return;
    }

    res.status(200).json({ exists: data && data.length > 0 });
  } catch (error: any) {
    console.error('Server error checking referrer email:', error);
    res.status(500).json({ error: error.message || 'Failed to check email' });
  }
};

// Create a new referrer with OTP verification
const createReferrer: RequestHandler = async (req, res) => {
  const { 
    full_name, 
    email_company, 
    email_personal, 
    phone_number, 
    company_name,
    role,
    linkedin_url,
    years_of_exp,
    twitter_url,
    portfolio_links,
    otp 
  } = req.body;

  // Validate required fields
  if (!full_name || !email_company || !phone_number || !company_name || !years_of_exp || !role || !linkedin_url || !otp) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    // First verify the OTP
    const { data, error } = await supabase.auth.verifyOtp({
      email: email_company,
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

    // OTP is valid, create the referrer
    const { data: referrerData, error: referrerError } = await supabase
      .from('referrers')
      .insert([
        { 
          uuid: userId, 
          full_name, 
          email_company, 
          email_personal,
          phone_number,
          company_name,
          role,
          linkedin_url,
          years_of_exp,
          twitter_url,
          portfolio_links
        }
      ])
      .select();  
    
    if (referrerError) {
      console.error('Error creating referrer:', referrerError);
      res.status(500).json({ error: `Database error: ${referrerError.message}` });
      return;
    }

    res.status(201).json({ 
      message: 'Referrer created successfully',
      referrer: referrerData?.[0] || null,  
      session: data.session,
      userId
    });
  } catch (error: any) {
    console.error('Server error creating referrer:', error);
    res.status(500).json({ error: error.message || 'Failed to create referrer' });
  }
};

router.get('/check-email', checkEmailExists);
router.post('/create', createReferrer);

export default router;
