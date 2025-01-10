export { default as LoginForm } from './ui/LoginForm/LoginForm'
export { default as ProfileInfo } from './ui/ProfileInfo/ProfileInfo'
export { default as RegisterForm } from './ui/RegisterForm/RegisterForm'
export { UserContainer } from './ui/UserContainer/UserContainer'
export { UserEdit } from './ui/UserEdit/UserEdit'

export { handleLogin, handleRegister, logout } from './api/authApi'

export type { loginData, registerData } from './interfaces/auth.type'
export type { IUser } from './interfaces/user.type'
