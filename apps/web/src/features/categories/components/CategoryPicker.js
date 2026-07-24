import { jsx as _jsx } from "react/jsx-runtime";
import { Select } from '@/shared/ui';
import { useCategories } from '../hooks/useCategories';
export function CategoryPicker({ value, onChange, label = 'Catégorie' }) {
    const { data: categories, isLoading } = useCategories();
    return (_jsx(Select, { label: label, value: value ?? '', onChange: (event) => onChange(event.target.value || null), placeholder: isLoading ? 'Chargement…' : 'Sélectionner une catégorie', options: (categories ?? []).map((category) => ({ value: category.id, label: category.name })) }));
}
