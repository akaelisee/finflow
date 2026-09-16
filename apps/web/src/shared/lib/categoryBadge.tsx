import type { Category } from '../../feature/categories/types/category.types';
import { CategoryIcon } from './categoryIcon';

type Props = {
  category: Category;
  size?: number;
};

export function CategoryBadge({ category, size = 28 }: Props) {
  return (
    <div
      className="p-2 rounded-md inline-flex items-center justify-center"
      style={{ background: category.color + '20', color: category.color }}
    >
      <CategoryIcon name={category.icon} size={size} />
    </div>
  );
}