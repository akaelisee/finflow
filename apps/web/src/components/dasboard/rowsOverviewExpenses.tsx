import React from "react";
import { Link } from "react-router-dom";

const RowsOverviewExpenses = () => {
    return(
        <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-4">
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

export default RowsOverviewExpenses;