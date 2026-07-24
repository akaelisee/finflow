import { Select } from '@/shared/ui';
import { useCategories } from '../hooks/useCategories';

interface CategoryPickerProps {
  value: string | null;
  onChange: (categoryId: string | null) => void;
  label?: string;
}

export function CategoryPicker({ value, onChange, label = 'Catégorie' }: CategoryPickerProps) {
  const { data: categories, isLoading } = useCategories();

  return (
    <Select
      label={label}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value || null)}
      placeholder={isLoading ? 'Chargement…' : 'Sélectionner une catégorie'}
      options={(categories ?? []).map((category) => ({ value: category.id, label: category.name }))}
    />
  );
}
