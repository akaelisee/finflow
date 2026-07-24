import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Button, Input, toast } from '@/shared/ui';
import { categoriesApi } from '../api/categoriesApi';
export function AddCategoryModal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#378adb');
    const [icon, setIcon] = useState('tag');
    const queryClient = useQueryClient();
    const createCategory = useMutation({
        mutationFn: categoriesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast('Catégorie créée', 'success');
            onClose();
        },
        onError: () => toast('Impossible de créer la catégorie', 'error'),
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        createCategory.mutate({ name, color, icon });
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Ajouter une cat\u00E9gorie", children: _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsx(Input, { label: "Nom", value: name, onChange: (event) => setName(event.target.value), required: true }), _jsx(Input, { label: "Couleur", type: "color", value: color, onChange: (event) => setColor(event.target.value) }), _jsx(Input, { label: "Ic\u00F4ne", value: icon, onChange: (event) => setIcon(event.target.value) }), _jsx(Button, { type: "submit", isLoading: createCategory.isPending, children: "Ajouter" })] }) }));
}
