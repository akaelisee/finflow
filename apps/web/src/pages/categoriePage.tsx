import RowsOverviewCategory from "@/components/category/rowsOverviewCategory";
import { CategoryIcon } from "@/utils/categoryIcon";
import { useEffect, useState } from "react";
import { getCategories, getCategoriesId, createCategories } from "@/api/categorys";
import { Categories } from "@/types/category";
import RowsListCategory from "@/components/category/rowsListCategory";
import { IconClockSearch, IconPlus, IconX } from "@tabler/icons-react";
import FormCategory from "@/components/category/formCategory";


const CategoriePage = () => {
  const [category, setCategory] = useState<Categories[]>([])
  const  [open, setOpen] = useState(false)

  useEffect(() => {
    getCategories().then((data) => {
      setCategory(data)
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);

  const handleAddCategory = async (categorie: Categories) => {
    const newCategory = await createCategories(categorie)
    setCategory((prevNewCategory) => [
      ...prevNewCategory,
      newCategory
    ]);
    setOpen(false);
  } 

    return ( 
        <>
        
          <div className="flex justify-between relative z-10">
            <div>
              <p className='text-2xl font-semibold'>Catégories</p>
              <span>Organisez vos dépenses avec des catégories personnalisées</span>
            </div>
          
            <div>
              <button onClick={() => setOpen(true)} className="flex flex-row gap-1 bg-blue-500 items-center cursor-pointer text-white rounded-md p-2"> 
                <IconPlus size={20} /> 
                <span>Nouvelle catégories</span> 
              </button>
            </div>
          </div>  

          <FormCategory 
            open={open} 
            onClose={setOpen}
            onAdd={handleAddCategory}
          /> 

          <RowsOverviewCategory categoryTotal={category}/>  

          <div className="mt-4 flex justify-between gap-4 w-full">
            <input className="border w-3/4 rounded-md p-2 lg:w-5/6" type="text" placeholder="Recherche une categorie"/>
            <select className="w-1/4 border rounded-md lg:w-1/6" name="" id="">
              <option value="text">test</option>
            </select>
          </div>  

          <RowsListCategory open={open} onClose={setOpen} categoryLists ={category} />

        </>
     );
}
 
export default CategoriePage;