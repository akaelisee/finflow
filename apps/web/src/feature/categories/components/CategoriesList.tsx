import { useState } from 'react';
import { IconTrash, IconEdit, IconPlus } from '@tabler/icons-react';
import { CategoryBadge } from '../../../shared/lib/categoryBadge';
import { AlertDrop } from '../../../shared/ui/AlertDrop';
import type { Category } from '../types/category.types';

type Props = {
  categories: Category[];
  onOpenForm: () => void;
  onDelete: (id: string) => void;
  onUpdate: (category: Category) => void;
};

const INITIAL_SYSTEM_LIMIT = 9;

export function CategoriesList({
  categories,
  onOpenForm,
  onDelete,
  onUpdate,
}: Props) {
  const [systemLimit, setSystemLimit] = useState(INITIAL_SYSTEM_LIMIT);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // ⭐ FIX du bug : les catégories système ont isDefault=true (par défaut)
  const customCategories = categories.filter((c) => !c.isDefault);
  const systemCategories = categories.filter((c) => c.isDefault);

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      onDelete(categoryToDelete);
    }
    setConfirmOpen(false);
    setCategoryToDelete(null);
  };

  const visibleSystemCategories = systemCategories.slice(0, systemLimit);
  const hasMoreSystem = systemCategories.length > INITIAL_SYSTEM_LIMIT;

  return (
    <div className="my-7">
      {/* Catégories personnalisées */}
      <p className="my-3 uppercase text-lg text-gray-500">
        Catégories personnalisées · {customCategories.length}
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {customCategories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col gap-3 bg-white border rounded-md p-4"
          >
            <div className="flex justify-between">
              <CategoryBadge category={category} />
              <div className="flex gap-2">
                <div
                  onClick={() => onUpdate(category)}
                  className="cursor-pointer bg-[#f9f8f4] w-10 h-10 border text-center rounded-sm p-1 relative"
                >
                  <IconEdit stroke={2} className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'/>
                </div>
                <div
                  onClick={() => handleDeleteClick(category.id)}
                  className="cursor-pointer bg-[#f9f8f4] w-10 h-10 border text-center rounded-sm p-1 relative"
                >
                  <IconTrash className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' stroke={2} />
                </div>
              </div>
            </div>
            <span className="text-black font-semibold">{category.name}</span>
          </div>
        ))}

        {/* Carte "ajouter" */}
        <div
          onClick={onOpenForm}
          className="flex flex-col items-center cursor-pointer justify-center bg-[#f9f8f4] border border-dashed rounded-md p-8"
        >
          <div className="bg-white p-2 rounded-full">
            <IconPlus size={28} />
          </div>
          <span>Ajouter une catégorie</span>
        </div>
      </div>

      <AlertDrop
        open={confirmOpen}
        onOpen={setConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Supprimer cette catégorie"
        message="Cette action est irréversible. Les transactions liées ne seront pas supprimées."
      />

      {/* Catégories système */}
      <p className="my-10 uppercase text-lg text-gray-500">
        Catégories système · {systemCategories.length}
      </p>
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
        {visibleSystemCategories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col gap-3 bg-white border rounded-md p-4"
          >
            <div className="flex justify-between">
              <CategoryBadge category={category} />
              {/* Pas d'actions sur les catégories système (lecture seule) */}
            </div>
            <span className="text-black font-semibold">{category.name}</span>
          </div>
        ))}
      </div>

      {hasMoreSystem && (
        <p className="text-center">
          {systemLimit !== systemCategories.length && (
            <>+ {systemCategories.length - systemLimit} autres catégories · </>
          )}
          <span
            onClick={() =>
              setSystemLimit(
                systemLimit === systemCategories.length
                  ? INITIAL_SYSTEM_LIMIT
                  : systemCategories.length,
              )
            }
            className="text-blue-400 cursor-pointer"
          >
            {systemLimit === systemCategories.length ? 'Réduire' : 'Tout afficher'}
          </span>
        </p>
      )}
    </div>
  );
}