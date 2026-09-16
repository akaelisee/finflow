import React, { useEffect, useState } from 'react';
import { IconX, IconChevronDown, IconBulb } from '@tabler/icons-react';
import { Budgets, CreateBudgetsInput, UpdateBudgetsInput } from '../types/budget.types';
import { useCategories } from '@/feature/categories';
import { Category } from '../../categories/types/category.types';
import { CategoryIcon } from '@/shared/lib/categoryIcon';

type Props = {
  open: boolean,
  onClose: () => void,
  onCreate?: (payload: CreateBudgetsInput) => void
  onUpdate?: (id: string, payload: UpdateBudgetsInput) => void
  budgetToEdit?: Budgets | null
}

export function BudgetsForm ({ open, onClose, onCreate, onUpdate, budgetToEdit }: Props) {
  const { categories } = useCategories();
  const [amount, setAmount] = useState<number>(0);
  const [openSelectInput, setOpenSelectInput] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const isEditMode = Boolean(budgetToEdit);

  useEffect(() => {
    if (!open) return;

    if (budgetToEdit) {
      setAmount(budgetToEdit.amount);
      setSelectedCategory(
        categories.find((category) => category.id === budgetToEdit.categoryId) ?? null
      );
    } else {
      setAmount(0);
      setSelectedCategory(null);
    }
  }, [open, budgetToEdit, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) return;

    if (isEditMode && budgetToEdit) {
      onUpdate?.(budgetToEdit.id, {
        categoryId: selectedCategory.id,
        amount,
        month: budgetToEdit.month,
      });
      onClose();
      return;
    }

    const now = new Date();
    const month = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    const payload = {
      categoryId: selectedCategory.id,
      amount,
      month,
    };

    onCreate?.(payload);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">

          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-xl"
          >

            {/* Header */}
            <div className="flex justify-between items-center p-5">
              <div className="flex flex-col">
                <span className="font-bold text-xl">
                  {isEditMode ? 'Modifier le budget' : 'Nouveau budget'}
                </span>

                <span className="text-md text-gray-600">
                  {isEditMode
                    ? 'Ajuster la limite mensuelle de cette catégorie'
                    : 'Définir une limite mensuelle par catégorie'}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="bg-slate-200 p-2 border border-gray-300 rounded-md cursor-pointer"
              >
                <IconX size={20} />
              </button>
            </div>

            <hr className="border" />

            {/* Corps du formulaire */}
            <div className="p-6">
              <div className="flex flex-col gap-2">
                <label>
                  Catégorie <sup className="text-red-700">*</sup>
                </label>
                <div className="relative">
                  <div
                    onClick={() => setOpenSelectInput(!openSelectInput)}
                    className="flex items-center gap-4 bg-[#F9F8F4] border rounded-md p-4 cursor-pointer"
                  >

                    {selectedCategory ? (
                      <>
                        <div
                          className="rounded-md flex items-center justify-center p-3"
                          style={{
                            backgroundColor: selectedCategory.color
                          }}
                        >
                          <CategoryIcon
                            name={selectedCategory.icon}
                            size={25}
                            color="white"
                          />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-semibold">
                            {selectedCategory.name}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1">
                        <span className="text-gray-500">
                          Sélectionner une catégorie
                        </span>
                      </div>
                    )}

                    {/* Chevron */}
                    <IconChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform ${
                        openSelectInput ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Liste déroulante */}
                  {openSelectInput && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-md shadow-md z-10 max-h-72 overflow-y-auto">
                      {categories.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedCategory(item);
                            setOpenSelectInput(false);
                          }}
                          className="flex items-center gap-4 p-3 cursor-pointer hover:bg-[#F9F8F4]"
                        >
                          <div
                            className="rounded-md flex items-center justify-center p-2"
                            style={{
                              backgroundColor: item.color
                            }}
                          >
                            <CategoryIcon
                              name={item.icon}
                              size={22}
                              color="white"
                            />
                          </div>

                          {/* Nom catégorie */}
                          <span className="font-medium">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Limite mensuelle */}
              <div className="my-5 flex flex-col gap-2">

                <label>
                  Limite mensuelle <sup className="text-red-700">*</sup>
                </label>

                <div className="relative">

                  <input
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    type="text"
                    placeholder="200,00"
                    className="border p-2 pr-10 rounded-sm w-full text-right text-2xl font-semibold tabular-nums"
                    required
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none">
                    €
                  </span>

                </div>

              </div>


              {/* Suggestion */}
              <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-md p-4">

                <IconBulb
                  size={20}
                  className="text-blue-800 shrink-0"
                />

                <div className="text-sm text-blue-800">

                  <p className="font-semibold">
                    Suggestion basée sur vos dépenses
                  </p>

                  <p className="mt-1">
                    Vous avez dépensé en moyenne{' '}
                    <strong className="font-semibold tabular-nums">
                      185 €/mois
                    </strong>{' '}
                    en Loisirs ces 3 derniers mois.
                  </p>

                </div>

              </div>

            </div>


            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

              <input
                type="submit"
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