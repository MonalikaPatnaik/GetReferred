const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

export interface ReferrerData {
  uuid?: string;
  full_name: string;
  email_company: string;
  email_personal?: string;
  phone_number: string;
  role: string;
  company_name: string;
  years_of_exp: number;
  linkedin_url: string;
  twitter_url?: string;
  portfolio_links?: string;
}

export interface RefereeData {
  uuid?: string;
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  graduation_year?: number;
  github_url?: string;
  leetcode_url?: string;
  codeforces_url?: string;
  codechef_url?: string;
  portfolio_links?: string;
}

export class ApiService {
  static async sendOTP(email: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error ?? 'Failed to send OTP');
    }
  }

  static async verifyOTP(email: string, otp: string, userType?: 'referee' | 'referrer'): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp, userType }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error ?? 'Failed to verify OTP');
    }

    const data = await response.json();
    
    // Store session data in localStorage
    if (data.session) {
      localStorage.setItem('session', JSON.stringify(data.session));
    }
    
    // If userType is provided, save user ID in localStorage
    if (userType && data.userId) {
      if (userType === 'referee') {
        localStorage.setItem('referee_id', data.userId);
      } else {
        localStorage.setItem('referrer_id', data.userId);
      }
      localStorage.setItem('user_type', userType);
    }
    
    return data;
  }

  static async checkReferrerEmailExists(email: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/referrers/check-email?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error ?? 'Failed to check email');
    }

    const data = await response.json();
    return data.exists;
  }

  static async checkEmailExists(email: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/referees/check-email?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error ?? 'Failed to check email');
    }

    const data = await response.json();
    return data.exists;
  }

  static async verifyOTPAndCreateReferrer(params: ReferrerData & { otp: string }): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/referrers/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error ?? 'Failed to create referrer');
    }

    const data = await response.json();
    
    // Save user ID in localStorage
    if (data.referrer && data.session) {
      localStorage.setItem('referrer_id', data.referrer.uuid || data.userId);
      localStorage.setItem('user_type', 'referrer');
      localStorage.setItem('session', JSON.stringify(data.session));
      return data.referrer.uuid || data.userId;
    }
    
    return '';
  }

  static async verifyOTPAndCreateReferee(params: RefereeData & { otp: string }): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/referees/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error ?? 'Failed to create referee');
    }

    const data = await response.json();
    
    // Save user ID in localStorage
    if (data.referee && data.session) {
      localStorage.setItem('referee_id', data.referee.uuid || data.userId);
      localStorage.setItem('user_type', 'referee');
      localStorage.setItem('session', JSON.stringify(data.session));
      return data.referee.uuid || data.userId;
    }
    
    return '';
  }

  static async getCurrentSession(): Promise<any> {
    // First check if we have a session in localStorage
    const sessionStr = localStorage.getItem('session');
    if (sessionStr) {
      try {
        return JSON.parse(sessionStr);
      } catch (e) {
        console.error('Error parsing session:', e);
      }
    }

    // If no session in localStorage, try to get it from the server
    const response = await fetch(`${API_BASE_URL}/auth/session`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.session) {
      localStorage.setItem('session', JSON.stringify(data.session));
      return data.session;
    }

    return null;
  }

  static async signOut(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error ?? 'Failed to sign out');
    }

    // Clear localStorage
    localStorage.removeItem('referee_id');
    localStorage.removeItem('referrer_id');
    localStorage.removeItem('user_type');
    localStorage.removeItem('session');
  }

  // Direct login for specific email (bypass for testing)
  static async directLogin(email: string): Promise<string | null> {
    if (email !== "moresarvesh8@gmail.com") {
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/auth/direct-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.userId) {
      // Save user ID in localStorage
      localStorage.setItem('referee_id', data.userId);
      localStorage.setItem('user_type', 'referee');
      return data.userId;
    }

    return null;
  }
}
