import AuthCard from '../components/auth/AuthCard'
import RegisterForm from '../components/auth/RegisterForm'

export default function Register() {
  return (
    <AuthCard title="Create account" text="Already have an account?" linkText="Login" linkTo="/login">
      <RegisterForm />
    </AuthCard>
  )
}