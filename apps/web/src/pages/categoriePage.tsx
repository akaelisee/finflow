import React from "react";
import { IconHome } from "@tabler/icons-react";

const CategoriePage = () => {
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
        </>
     );
}
 
export default CategoriePage;