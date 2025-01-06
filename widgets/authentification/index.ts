export { default as LoginForm } from './ui/LoginForm/LoginForm'
export { default as RegisterForm } from './ui/RegisterForm/RegisterForm'

export { handleLogin, handleRegister, logout } from './api/authApi'

export type { loginData, registerData } from './interfaces/auth.type'
export type { IUser } from './interfaces/user.type'
