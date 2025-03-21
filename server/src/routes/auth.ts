import express, { RequestHandler } from 'express';
import { supabase } from '../config/supabase';

const router = express.Router();

// Send OTP
const sendOTP: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
      }
    });

    if (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: `Error sending OTP: ${error.message}` });
      return;
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error('Server error sending OTP:', error);
    res.status(500).json({ error: error.message || 'Failed to send OTP' });
  }
};

// Verify OTP
const verifyOTP: RequestHandler = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ error: 'Email and OTP are required' });
    return;
  }

  try {
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

    res.status(200).json({ 
      message: 'OTP verified successfully',
      session: data.session,
      user: data.user
    });
  } catch (error: any) {
    console.error('Server error verifying OTP:', error);
    res.status(500).json({ error: error.message || 'Failed to verify OTP' });
  }
};

// Direct login for specific email addresses (for testing/development)
const directLogin: RequestHandler = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }
  
  // Check if email is in allowed list (this should be environment-specific)
  const allowedEmails = process.env.ALLOWED_DIRECT_LOGIN_EMAILS?.split(',') || [];
  if (!allowedEmails.includes(email)) {
    res.status(403).json({ error: 'Direct login not allowed for this email' });
    return;
  }
  
  try {
    // Create a magic link but auto-verify it
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
      }
    });
    
    if (error) {
      console.error('Error with direct login:', error);
      res.status(500).json({ error: `Error with direct login: ${error.message}` });
      return;
    }
    
    // Return a success response
    res.status(200).json({ 
      message: 'Direct login successful',
      session: data.session,
      user: data.user
    });
  } catch (error: any) {
    console.error('Server error with direct login:', error);
    res.status(500).json({ error: error.message || 'Failed to perform direct login' });
  }
};

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/direct-login', directLogin);

export default router;
