// Composants exposés au reste de l'app
export { CategoriesOverview } from './components/CategoriesOverview';
export { CategoriesList } from './components/CategoriesList';
export { CategoryForm } from './components/CategoryForm';

// Hooks exposés
export { useCategories } from './hooks/useCategories';
export { useCreateCategory } from './hooks/useCreateCategory';
export { useUpdateCategory } from './hooks/useUpdateCategory';
export { useDeleteCategory } from './hooks/useDeleteCategory';

// Types exposés
export type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from './types/category.types';