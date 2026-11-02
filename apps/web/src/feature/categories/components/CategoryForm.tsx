import { useEffect, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { CategoryColorPicker } from './CategoryColorPicker';
import { CategoryIconPicker, AVAILABLE_ICONS, type IconSelection } from './CategoryIconPicker';
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../types/category.types';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: CreateCategoryInput) => void;
  onUpdate: (id: string, payload: UpdateCategoryInput) => void;
  categoryToEdit: Category | null;
};

export function CategoryForm({
  open,
  onClose,
  onCreate,
  onUpdate,
  categoryToEdit,
}: Props) {
  const isEditMode = !!categoryToEdit;

  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState({ index: 0, color: '' });
  const [selectedIcon, setSelectedIcon] = useState<IconSelection | null>(null);

  // Préremplit le formulaire en mode édition, le réinitialise sinon
  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setSelectedColor({ index: 0, color: categoryToEdit.color });
      const iconMatch = AVAILABLE_ICONS.find((i) => i.name === categoryToEdit.icon);
      setSelectedIcon(iconMatch ?? null);
    } else {
      setName('');
      setSelectedColor({ index: 0, color: '' });
      setSelectedIcon(null);
    }
  }, [categoryToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      color: selectedColor.color,
      icon: selectedIcon?.name ?? '',
    };

    if (isEditMode && categoryToEdit) {
      onUpdate(categoryToEdit.id, payload);
    } else {
      onCreate(payload);
    }
  };

  if (!open) return null;

  const IconComponent = selectedIcon?.Icon;

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0 mx-auto ml-16 lg:ml-72">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow-xl w-[80%] sm:my-8 sm:w-full sm:max-w-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5">
              <div className="flex flex-col">
                <span className="font-bold text-md  lg:text-xl">
                  {isEditMode ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                </span>
                <span className="text-sm text-gray-600 lg:text-md">
                  {isEditMode
                    ? 'Modifier votre catégorie personnalisée'
                    : 'Créer une catégorie personnalisée'}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-200 p-1 border border-gray-300 rounded-md cursor-pointer lg:p-2"
              >
                <IconX size={20} />
              </button>
            </div>
            <hr className="border" />

            {/* Corps du formulaire */}
            <div className="p-6">
              {/* Aperçu temps réel */}
              <div className="flex items-center gap-4 bg-[#F9F8F4] border rounded-md p-6">
                {selectedIcon && IconComponent && (
                  <div
                    className="rounded-md flex items-center justify-center p-3"
                    style={{ background: selectedColor.color }}
                  >
                    <IconComponent size={25} color="white" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm">Aperçu</span>
                  <span className="font-semibold">{name || 'Sans nom'}</span>
                </div>
              </div>

              {/* Nom */}
              <div className="my-5 flex flex-col gap-2">
                <label>
                  Nom <sup className="text-red-700">*</sup>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Voyage"
                  className="border p-2 rounded-sm"
                  required
                />
              </div>

              <CategoryColorPicker
                value={selectedColor}
                onChange={setSelectedColor}
              />
              <CategoryIconPicker
                value={selectedIcon}
                onChange={setSelectedIcon}
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <input
                type="submit"
                value={
                  isEditMode
                    ? 'Enregistrer les modifications'
                    : 'Créer la catégorie'
                }
                className="cursor-pointer inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 sm:ml-3 sm:w-auto"
              />
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}