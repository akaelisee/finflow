import React from "react";
import { Link } from "react-router-dom";

const GraphCategory = () => {
    return(
        <div className="flex flex-col gap-3 bg-white border rounded-md p-4">
            <span className='text-gray-500'>Solde total</span>
            <span className='text-2xl font-semibold'>4 285 €</span>
            <span>+2,3 %</span>
        </div>
    )
}

export default GraphCategory;