import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, toast } from '@/shared/ui';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
import type { AuthResponse, RegisterPayload } from '../types/auth.types';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  const register = useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (payload) => authApi.register(payload),
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      navigate('/dashboard');
    },
    onError: () => toast('Impossible de créer le compte', 'error'),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register.mutate({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Nom" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required />
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
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        minLength={8}
      />
      <Button type="submit" isLoading={register.isPending}>
        Créer mon compte
      </Button>
    </form>
  );
}
