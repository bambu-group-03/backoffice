import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import firebase_app from '../config';

const auth = getAuth(firebase_app);

// Send password reset email
export default async function resetPasswordEmail(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}
