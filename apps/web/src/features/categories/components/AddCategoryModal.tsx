import { useState } from 'react';
import type { FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Button, Input, toast } from '@/shared/ui';
import { categoriesApi } from '../api/categoriesApi';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createCategory.mutate({ name, color, icon });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter une catégorie">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Nom" value={name} onChange={(event) => setName(event.target.value)} required />
        <Input label="Couleur" type="color" value={color} onChange={(event) => setColor(event.target.value)} />
        <Input label="Icône" value={icon} onChange={(event) => setIcon(event.target.value)} />
        <Button type="submit" isLoading={createCategory.isPending}>
          Ajouter
        </Button>
      </form>
    </Modal>
  );
}
