import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-gray-500">Cette page n'existe pas.</p>
      <Link to="/" className="mt-4 text-brand-600 hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}
