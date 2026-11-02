import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import {
  CategoriesOverview,
  CategoriesList,
  CategoryForm,
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  type Category,
} from '../feature/categories';
import { Button } from '@/shared/ui/Button';

export function CategoriesPage() {
  const { categories, isLoading, error, setCategories } = useCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const { create } = useCreateCategory({
    onSuccess: (created) => {
      setCategories([...categories, created]);
      closeForm();
    },
  });

  const { update } = useUpdateCategory({
    onSuccess: (updated) => {
      setCategories(
        categories.map((c) => (c.id === updated.id ? updated : c)),
      );
      closeForm();
    },
  });

  const { remove } = useDeleteCategory({
    onSuccess: (deletedId) => {
      setCategories(categories.filter((c) => c.id !== deletedId));
    },
  });

  const openCreateForm = () => {
    setCategoryToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = (category: Category) => {
    setCategoryToEdit(category);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCategoryToEdit(null);
  };

  if (isLoading) return <p>Chargement…</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      <div className="flex justify-between relative z-0">
        <div>
          <p className="text-2xl font-semibold">Catégories</p>
          <span>Organisez vos dépenses avec des catégories personnalisées</span>
        </div>


        <Button 
          variant="danger" 
          icon={<IconPlus size={16} />}
          className="flex flex-row gap-1 bg-blue-500 items-center cursor-pointer text-white rounded-md p-2"
          onClick={openCreateForm}
          >
          Nouvelle catégorie
        </Button>

        {/* <button
          onClick={openCreateForm}
          className="flex flex-row gap-1 bg-blue-500 items-center cursor-pointer text-white rounded-md p-2"
        >
          <IconPlus size={20} />
          <span>Nouvelle catégorie</span>
        </button> */}
      </div>

      <CategoryForm
        open={isFormOpen}
        onClose={closeForm}
        onCreate={create}
        onUpdate={update}
        categoryToEdit={categoryToEdit}
      />

      <CategoriesOverview categories={categories} />

      <div className="mt-4 flex justify-between gap-4 w-full">
        <input
          className="border w-3/4 rounded-md p-2 lg:w-5/6"
          type="text"
          placeholder="Rechercher une catégorie"
        />
        <select className="w-1/4 border rounded-md lg:w-1/6">
          <option>Toutes</option>
          <option>Système</option>
          <option>Personnalisées</option>
        </select>
      </div>

      <CategoriesList
        categories={categories}
        onOpenForm={openCreateForm}
        onUpdate={openEditForm}
        onDelete={remove}
      />
    </>
  );
}