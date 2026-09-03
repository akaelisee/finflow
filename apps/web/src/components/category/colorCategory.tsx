import { Value } from "@prisma/client/runtime/client";
import { useState } from "react";


type colorType = {
  index: number,
  color: string
}

type Props = {
    onColors: colorType,
    onSelectedColor: (value: colorType) => void
}

const ColorCategory = ({ onColors, onSelectedColor }:Props) => {

  const dataColor = ['#378ADD', '#D85A30', '#1D9E75', '#BA7517', '#7F77DD', '#D4537E', '#E24B4A', '#639922', '#5F5E5A'];
    return (
       <div className="my-5">
            <p>Coulour</p>
            <div className=" mt-3 flex flex-row gap-2 justify-between">
            {
                dataColor.map((color, index) => (
                <div 
                    onClick={() => { 
                        onSelectedColor({index, color}); 
                    }} 
                    key={index} 
                    
                    className="cursor-pointer border-2 border-white w-12 h-12 rounded-full"
                    style={{
                    backgroundColor: color,
                    boxShadow: onColors.index=== index
                        ? `0 0 0 2px ${color}`
                        : 'none'
                    }}>
            </div>
            ))}
            </div>
        </div>
    )
}

export default ColorCategory;