import { Categories } from "@/types/category";

type Props = {
    categoryTotal: Categories[];
}

const RowsOverviewCategory = ({ categoryTotal }: Props) => {
    
    const personalizedCategoryFilter = categoryTotal.filter((itemCategpry) => {
            return itemCategpry.isDefault === false;
    });

    console.log(personalizedCategoryFilter);

    return(
        <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
            <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
                <span className='text-gray-500'>Total</span>
                <span className='text-2xl font-semibold'>{categoryTotal.length}</span>
                <span>
                    {categoryTotal.length} système{categoryTotal.length > 1 ? "s" : ""} +{" "}
                    {personalizedCategoryFilter.length} personnalisé{personalizedCategoryFilter.length > 1 ? "s" : ""}
                </span>
            </div>
            <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
                <span className='text-gray-500'>Solde total</span>
                <span className='text-2xl font-semibold'>4 285 €</span>
                <span>+2,3 %</span>
            </div>
            <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
                <span className='text-gray-500'>Solde total</span>
                <span className='text-2xl font-semibold'>4 285 €</span>
                <span>+2,3 %</span>
            </div>
        </div>
    )
}

export default RowsOverviewCategory;