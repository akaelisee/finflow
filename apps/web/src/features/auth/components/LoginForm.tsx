import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, toast } from '@/shared/ui';
import { useLogin } from '../hooks/useLogin';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useLogin();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => navigate('/dashboard'),
        onError: () => toast('Identifiants invalides', 'error'),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Input
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Button type="submit" isLoading={login.isPending}>
        Se connecter
      </Button>
    </form>
  );
}
