export type { AuthSchema } from './model/types/authSchema'
export { authReducer, authActions } from './model/slices/authSlice'

// Components
export { UserController } from './components/user-controller'
export { AuthModal } from './components/auth-modal'
export { AuthProvider } from './components/auth-provider'
//
export { LoginForm } from './components/forms/login-form'
export { SchoolRegistrationForm } from './components/forms/reg-form/SchoolRegistrationForm'
export { TeacherRegistrationForm } from './components/forms/reg-form/TeacherRegistrationForm'
export { UserRegistrationForm } from './components/forms/reg-form/UserRegistrationForm'
export { ResetForm } from './components/forms/reset-form/ResetForm.tsx'

// Selectors
export { getAuthData } from './model/selectors/auth.ts'

// Services
export { approve } from './model/services/approve'
export { userReg } from './model/services/registration/user-reg'
export { login } from './model/services/login'
export { logout } from './model/services/logout'
export { sendApprovalEmail } from './model/services/sendEmail.ts'
