import { Budgets } from '../types/budget.types';
import { CategoryIcon } from '@/shared/lib/categoryIcon';
import { Link } from 'react-router-dom';

type Props = {
    budgets: Budgets[]
}

export const BudgetsList = ({ budgets }: Props) => {
    return (
     
      <div className="flex flex-col gap-3">
        {budgets.map(
          (budget) => {
            const { id, amount } = budget;
            const { category } = budget as Budgets & {
              category: {
                color: string;
                icon: string;
                name: string;
              };
            };
            const isExceeded = false;

            return (
            <div key={id}
              className={`rounded-lg border bg-white px-4 py-3.5 ${
                isExceeded ? 'border-[#E5B4B4]' : 'border-[#E5E3DC]'
              }`}
            >
              <Link to={`${id}`}>
                <div className="mb-2.5 flex items-center justify-between">
                  
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-[36px] w-[36px] items-center justify-center rounded-md"
                      style={{ backgroundColor: `color-mix(in srgb, ${category.color} 60%, transparent)` , color: `${category.color}`  }}
                    > 
                      <CategoryIcon
                        name={category.icon}
                        size={25}
                        color="white"
                      />
                    </div>
                    <span className="text-lg font-medium">{category.name}</span>
                    {isExceeded && (
                      <span className="rounded-[10px] bg-[#FBE9E9] px-2 py-0.5 text-[11px] text-[#A32D2D]">
                        Dépassé
                      </span>
                    )}
                  </div>
                  <div className="text-[13px]">
                    <span className={`font-medium ${isExceeded ? 'text-[#A32D2D]' : ''}`}>{'amount'}</span>
                    <span className="text-[#6B6B66]"> / {amount}</span>
                  </div>
                </div>

                <div className="h-[7px] overflow-hidden rounded bg-[#F9F8F4]">
                  <div
                    className="h-full"
                    style={{ width: `${45}%`, backgroundColor: category.color }}
                  />
                </div>

                <p className={`mt-[7px] text-[11px] ${isExceeded ? 'text-[#A32D2D]' : 'text-[#6B6B66]'}`}>
                  {'73 % · reste 110 €'}
                </p>
              </Link>

            </div>
            );
          },
        )}
      </div>
    )
}