import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, toast } from '@/shared/ui';
import { useLogin } from '../hooks/useLogin';
export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = useLogin();
    const handleSubmit = (event) => {
        event.preventDefault();
        login.mutate({ email, password }, {
            onSuccess: () => navigate('/dashboard'),
            onError: () => toast('Identifiants invalides', 'error'),
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsx(Input, { label: "Email", type: "email", autoComplete: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true }), _jsx(Input, { label: "Mot de passe", type: "password", autoComplete: "current-password", value: password, onChange: (event) => setPassword(event.target.value), required: true }), _jsx(Button, { type: "submit", isLoading: login.isPending, children: "Se connecter" })] }));
}
