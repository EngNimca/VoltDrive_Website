import AuthCard from '../components/auth/AuthCard'
import LoginForm from '../components/auth/LoginForm'

export default function Login() {
  return (
    <AuthCard title="Welcome back" text="No account?" linkText="Register" linkTo="/register">
      <LoginForm />
    </AuthCard>
  )
}