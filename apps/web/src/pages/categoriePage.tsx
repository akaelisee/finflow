import RowsOverviewCategory from "@/components/category/rowsOverviewCategory";
import { CategoryIcon } from "@/utils/categoryIcon";
import { useEffect, useState } from "react";
import { getCategories, getCategoriesId, createCategories } from "@/api/categorys";
import { Categories } from "@/types/category";
import RowsListCategory from "@/components/category/rowsListCategory";

const CategoriePage = () => {
  const [category, setCategory] = useState<Categories[]>([])

  useEffect(() => {
    getCategories().then((data) => {
      setCategory(data)
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);


    return ( 
        <>
          <div className="flex justify-between">
            <div className="">
              <p className='text-2xl font-semibold'>Catégories</p>
              <span>Organisez vos dépenses avec des catégories personnalisées</span>
            </div>
            <div className="">
              <button type="button" className="bg-blue-500 text-white rounded-md p-2"> + Nouvelle catégories</button>
            </div>
          </div>   

          <RowsOverviewCategory categoryTotal={category}/>  

          <div className="mt-4 flex justify-between gap-4 w-full">
            <input className="border w-3/4 rounded-md p-2 lg:w-5/6" type="text" placeholder="Recherche une categorie"/>
            <select className="w-1/4 border rounded-md lg:w-1/6" name="" id="">
              <option value="text">test</option>
            </select>
          </div>  

          <RowsListCategory categoryLists ={category} />

        </>
     );
}
 
export default CategoriePage;