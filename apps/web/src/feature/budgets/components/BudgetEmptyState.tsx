import {
  IconPlus,
  IconAlertTriangle,
  IconBrandPlanetscale 
} from '@tabler/icons-react';


type Props = {
    openForm: () => void
}

export const BudgetEmptyState = ({ openForm }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center border bg-red border-dashed p-16">
              <div className="bg-[#F9F8F4] p-4 rounded-full">
                <IconBrandPlanetscale size={50} stroke={2} className='text-gray-400'/>
              </div> 
              <div className="p-4 mt-4 text-center">
                <p className='text-lg font-semibold'>Aucun budget pour le moment</p>
                <p className='max-w-lg pt-2 mx-auto'>Ajoutez votre première transaction manuellement ou importez un relevé bancaire au format CSV pour commencer.</p>
              </div>
              <div className="flex max-w-lg w-full gap-6 mt-5">
                <button
                  type="button"
                  onClick={openForm}
                  className="flex justify-center font-medium text-center  items-center cursor-pointer gap-1 w-full rounded-md px-4 py-2 bg-blue-500 text-white transition-all  hover:bg-blue-700"
                >
                  <IconPlus size={20} />
                  Ajouter un budget
                </button>
                {/* <button
                  // onClick={() => onOpen(false)}
                  type="button"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white  text-gray-700 hover:bg-gray-50 "
                >
                  Annuler
                </button> */}
              </div>
          </div>
    )
}