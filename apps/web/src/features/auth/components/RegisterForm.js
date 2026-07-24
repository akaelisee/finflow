import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, toast } from '@/shared/ui';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
export function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const setSession = useAuthStore((state) => state.setSession);
    const register = useMutation({
        mutationFn: (payload) => authApi.register(payload),
        onSuccess: (data) => {
            setSession(data.user, data.accessToken);
            navigate('/dashboard');
        },
        onError: () => toast('Impossible de créer le compte', 'error'),
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        register.mutate({ name, email, password });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsx(Input, { label: "Nom", autoComplete: "name", value: name, onChange: (event) => setName(event.target.value), required: true }), _jsx(Input, { label: "Email", type: "email", autoComplete: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true }), _jsx(Input, { label: "Mot de passe", type: "password", autoComplete: "new-password", value: password, onChange: (event) => setPassword(event.target.value), required: true, minLength: 8 }), _jsx(Button, { type: "submit", isLoading: register.isPending, children: "Cr\u00E9er mon compte" })] }));
}
