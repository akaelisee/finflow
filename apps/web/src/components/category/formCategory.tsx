import { Categories } from "@/types/category";
import { CategoryIcon } from "../../utils/categoryIcon";
import { IconPlus, IconX } from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import ColorCategory from "./colorCategory";
import IconFormCategory from "./iconFormCategory";
import { useEffect, useState } from "react";
import { CategoriesPlayload } from "@/types/category";

type Props = {
  open: boolean,
  onClose: (value: boolean) => void
  onAdd: (value: Categories) => void
  onFormUpdate: (id: string, categorie: Categories | null) => void
  categoryToEdit: Categories | null
}

type iconType = {
  name: string,
  Icon: Icon
}

type colorType = {
  index: number,
  color: string
}

const FormCategory = ({ open, onClose, onAdd, onFormUpdate, categoryToEdit }: Props) => {

    const isEditMode = !!categoryToEdit;

    const [selectedIcon, setSelectedIcon] = useState<iconType | null>(null)
    const [selectColor, setSelectedColor] = useState<colorType>({
      index: 0,
      color: "",
    });
    const [nameCategory, setNameCategory] = useState('');

    // Préremplit le formulaire quand on passe en mode édition,
    // et le réinitialise quand on revient en mode ajout
    useEffect(() => {
      if (categoryToEdit) {
        setNameCategory(categoryToEdit.name);
        setSelectedColor({ index: 0, color: categoryToEdit.color });
        // ⚠️ l'icône n'est pas préremplie ici : il faut retrouver le composant Icon
        // correspondant à categoryToEdit.icon (probablement dans iconFormCategory.tsx).
        // Envoie-moi ce fichier pour que je complète ce point.
      } else {
        setNameCategory('');
        setSelectedColor({ index: 0, color: '' });
        setSelectedIcon(null);
      }
    }, [categoryToEdit]);

    const IconComponent = selectedIcon?.Icon;

    function handleChange(e: any) {
      setNameCategory(e.target.value)
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault();

      const dataCategory: CategoriesPlayload = {
        id: categoryToEdit?.id ?? '',
        userId: "",
        name: nameCategory,
        color: selectColor.color,
        icon: selectedIcon?.name ?? "",
        isDefault: true,
      };

      if (isEditMode && categoryToEdit) {
        onFormUpdate(categoryToEdit.id, dataCategory);
      } else {
        onAdd(dataCategory);
      }
    }
  
    return (
      open && 
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form
            onSubmit={(e)=>handleSubmit(e)}
             className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >

               <div className="flex justify-between items-center p-5 ">
                  <div className="flex flex-col">
                    <span className="font-bold text-xl">
                      {isEditMode ? "Modifier la catégorie" : "Nouvelle catégorie"}
                    </span>
                    <span className="text-md">
                      {isEditMode ? "Modifier votre catégorie personnalisée" : "Créer une catégorie personnalisée"}
                    </span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => onClose(false)}
                    className="bg-slate-200 p-2 border border-gray-300 rounded-md cursor-pointer">
                    <IconX size={20}/>
                  </button>
              </div>
              <hr className="border"/>

                <div className="p-6">
                  <div className="flex items-center gap-4 bg-[#F9F8F4] border rounded-md p-6">
                    {
                      selectedIcon ? 
                      <div className="bg-white rounded-md flex flex-col items-center justify-center p-3" style={{background: `${selectColor?.color}`}}>
                        {IconComponent && <IconComponent size={25} />}
                      </div>
                       : ''
                    }
                    <div className="flex flex-col ite">
                      <span className="text-sm">Aperçu</span>
                      <span className="font-semibold">{nameCategory}</span>
                    </div>
                  </div>

                  <div className="my-5 flex flex-col gap-2">
                    <label htmlFor="">Nom <sup  className="text-red-700">*</sup></label>
                    <input 
                      onChange={(e) => handleChange(e)}
                      value={nameCategory}
                      type="text" 
                      placeholder="Voyage" 
                      className="border p-2 rounded-sm"
                    />
                  </div>

                  <ColorCategory onColors={selectColor} onSelectedColor={setSelectedColor} />
                  <IconFormCategory onIcon={selectedIcon} onSelectedIcon={setSelectedIcon}/>

                </div>


              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <input
                  type="submit"
                  value={isEditMode ? "Enregistrer les modifications" : "J'ajoute une categorie"}
                  className="cursor-pointer inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                />
                <button
                  type="button"
                  data-autofocus
                  onClick={() => onClose(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default FormCategory;