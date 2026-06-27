export { auth, db, storage } from './config'
export {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logout,
  resetPassword,
  resendVerification,
  getUserProfile,
  onAuthChange,
} from './auth'
export type { UserRole, UserProfile } from './auth'
