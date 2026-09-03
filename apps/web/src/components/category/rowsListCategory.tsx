import { Categories } from "@/types/category";
import {IconTrash,  IconEdit, IconPlus} from '@tabler/icons-react'
import { CategoryBadge } from "@/utils/categoryBadge";
import { useState } from 'react';
import AlertDrop from "./alertDrop";

type Props = {
  categoryLists: Categories[]
   open : boolean,
    onClose: (Value: boolean) => void
}

const RowsListCategory = ({ categoryLists, open, onClose }:Props) => {

  const [btnAll, setBtnAll] = useState(9)

   const listCategoryPersonalized = categoryLists.filter((categoryList) => {
      return categoryList.isDefault === true
   });

   const listCategorySysteme = categoryLists.filter((categoryList) => {
      return categoryList.isDefault === false
   });


    return(
      <div className="my-7">
        <p className="my-3 uppercase text-lg text-gray-500">Catégories personnalisées · {listCategorySysteme.length}</p> 
        <div className="grid grid-cols-1 gap-4  md:grid-cols-4">

          {
            listCategorySysteme.map((personal, index) => (
              <div key={index} className="flex flex-col gap-3 bg-white border rounded-md p-4">
                <div className="flex justify-between">
                  <div className="">
                    <CategoryBadge badges={personal}/>
                  </div>
                  <div className="flex gap-2">
                    <div 
                    
                      className="cursor-pointer bg-[#f9f8f4] w-7 h-7 biorder text-center rounded-sm p-1"
                    >
                      <IconEdit stroke={2} />
                    </div>
                    <div className="cursor-pointer bg-[#f9f8f4] w-7 h-7 biorder text-center rounded-sm p-1"><IconTrash stroke={2} /></div>
                  </div>
                </div>
                  <span className='text-black font-semibold'>{personal.name}</span>
              </div>
            ))
          }

          {/* 3ème carte ajoutée manuellement */}
          <div
            onClick={() =>onClose(true)} 
           className="flex flex-col items-center cursor-pointer justify-center bg-[#f9f8f4] border border-dashed rounded-md p-8">
            <div className="bg-white p-2 rounded-full">
              <IconPlus size={28}/> 
            </div>
            <span>
              Ajouter une catégorie
            </span>
          </div>

        </div> 

        {/* <AlertDrop /> */}
          
          <p className="my-10 uppercase text-lg text-gray-500">Catégories personnalisées · {listCategoryPersonalized.length}</p> 
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            {
              listCategoryPersonalized.slice(0, btnAll).map((personal, index) => (
                <div key={index} className="flex flex-col gap-3 bg-white border rounded-md p-4">
                  <div className="flex justify-between">
                    <div className="">
                      <CategoryBadge badges={personal}/>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-[#f9f8f4] biorder rounded-sm p-1"><IconEdit stroke={2} /></div>
                      <div className=""><IconTrash stroke={2} /></div>
                    </div>
                  </div>
                    <span className='text-black font-semibold'>{personal.name}</span>
                    <span>4 mot clée</span>
                </div>
              ))
            }
         </div> 
          {listCategoryPersonalized.length > 9 && (
            <p className="text-center">
              {btnAll !== listCategoryPersonalized.length && (
                <>
                  + {listCategoryPersonalized.length - btnAll} autres catégories ·{" "}
                </>
              )}

              <span
                onClick={() =>
                  setBtnAll(
                    btnAll === listCategoryPersonalized.length
                      ? 9
                      : listCategoryPersonalized.length
                  )
                }
                className="text-blue-400 cursor-pointer"
              >
                {btnAll === listCategoryPersonalized.length
                  ? "Réduire"
                  : "Tout afficher"}
              </span>
            </p>
          )}
      </div>
    )
}

export default RowsListCategory;