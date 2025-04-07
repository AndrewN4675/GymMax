import { neon } from '@neondatabase/serverless';
import { createHash } from 'crypto';

const sql = neon(`${process.env.DATABASE_URL}`);

// Generate a random 6-digit code
function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store reset codes in memory (for a real app, use a database table)
// In production, you'd want to use a proper database table with expiration
type ResetRequest = {
  email: string;
  code: string;
  expiry: number; // timestamp
};

// This is just for demo purposes - in production use a database table
const resetRequests = new Map<string, ResetRequest>();

export async function RequestReset(email: string) {
  email = email.toLowerCase();
  
  try {
    // Check if the email exists in the database
    const result = await sql`
      SELECT * FROM Member
      WHERE email = ${email};
    `;
    
    if (result.length === 0) {
      // User not found
      throw new Error('Email not found');
    }
    
    // Generate a reset code
    const resetCode = generateResetCode();
    
    // Store the reset request with a 15-minute expiry
    resetRequests.set(email, {
      email,
      code: resetCode,
      expiry: Date.now() + 15 * 60 * 1000 // 15 minutes
    });
    
    // Send an email with the reset code
    console.log(`Reset code for ${email}: ${resetCode}`);
    
    // TODO: Implement actual email sending
    // For development, we'll log the code to the console
    
    return { success: true };
  } catch (error) {
    console.error('Reset request failed', error);
    throw new Error('Reset request failed');
  }
}

export async function VerifyResetCode(email: string, code: string) {
  email = email.toLowerCase();
  
  // Check if we have a reset request for this email
  const request = resetRequests.get(email);
  
  if (!request) {
    return { success: false, error: 'No reset request found' };
  }
  
  // Check if the request has expired
  if (request.expiry < Date.now()) {
    resetRequests.delete(email);
    return { success: false, error: 'Reset code expired' };
  }
  
  // Check if the code matches
  if (request.code !== code) {
    return { success: false, error: 'Invalid reset code' };
  }
  
  return { success: true };
}

export async function UpdatePassword(email: string, newPassword: string) {
  email = email.toLowerCase();
  
  try {
    // Hash the new password
    const hashedPass = createHash('sha256').update(newPassword).digest('hex');
    
    // Update the password in the database
    await sql`
      UPDATE Member
      SET user_password = ${hashedPass}
      WHERE email = ${email};
    `;
    
    // Clear the reset request
    resetRequests.delete(email);
    
    return { success: true };
  } catch (error) {
    console.error('Password update failed', error);
    throw new Error('Password update failed');
  }
}