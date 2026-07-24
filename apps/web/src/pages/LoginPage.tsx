import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-8">
        <h1 className="mb-6 text-xl font-bold text-gray-900">Connexion à FinFlow</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-500">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-medium text-brand-600 hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
