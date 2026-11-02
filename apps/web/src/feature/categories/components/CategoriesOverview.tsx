import type { Category } from '../types/category.types';

type Props = {
  categories: Category[];
};

export function CategoriesOverview({ categories }: Props) {
  const systemCount = categories.filter((c) => c.isDefault).length;
  const customCount = categories.filter((c) => !c.isDefault).length;

  return (
    <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
      <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
        <span className="text-gray-500">Total</span>
        <span className="text-2xl font-semibold">{categories.length}</span>
        <span>
          {systemCount} système{systemCount > 1 ? 's' : ''} + {customCount}{' '}
          personnalisée{customCount > 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
        <span className="text-gray-500">Utilisées ce mois</span>
        <span className="text-2xl font-semibold">—</span>
        <span>Bientôt disponible</span>
      </div>
      <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
        <span className="text-gray-500">Plus grosse catégorie</span>
        <span className="text-2xl font-semibold">—</span>
        <span>Bientôt disponible</span>
      </div>
    </div>
  );
}