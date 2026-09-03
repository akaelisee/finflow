
import { Categories } from "@/types/category";
import { CategoryIcon } from "../../utils/categoryIcon";
import { IconPlus, IconX } from "@tabler/icons-react";

import {
  IconHome,
  IconShoppingCart,
  IconCar,
  IconMovie,
  IconHeart,
  IconBriefcase,
  IconGift,
  IconPlane,
  IconCoffee,
  IconBook,
  IconDeviceMobile,
  IconPigMoney,
  IconPaw,
  IconShirt,
  IconBolt,
  IconChefHat,
  IconFileInvoice,
  IconTrendingUp,
  IconQuestionMark,
} from '@tabler/icons-react';
import { useState } from "react";

import type { Icon } from "@tabler/icons-react";

type iconType = {
  name: string,
  Icon: Icon
}

type Props = {
  onIcon: iconType | null,
  onSelectedIcon: (Icon: iconType) => void
}

const IconFormCategory = ({onIcon, onSelectedIcon}: Props) => {
    
          
      const dataIcons = [
        { name: 'home', Icon: IconHome },
        { name: 'shopping-cart', Icon: IconShoppingCart },
        { name: 'car', Icon: IconCar },
        { name: 'movie', Icon: IconMovie },
        { name: 'heart', Icon: IconHeart },
        { name: 'briefcase', Icon: IconBriefcase },
        { name: 'gift', Icon: IconGift },
        { name: 'plane', Icon: IconPlane },
        { name: 'coffee', Icon: IconCoffee },
        { name: 'book', Icon: IconBook },
        { name: 'device-mobile', Icon: IconDeviceMobile },
        { name: 'pig-money', Icon: IconPigMoney },
        { name: 'paw', Icon: IconPaw },
        { name: 'shirt', Icon: IconShirt },
        { name: 'bolt', Icon: IconBolt },
        { name: 'chef-hat', Icon: IconChefHat },
        { name: 'file-invoice', Icon: IconFileInvoice },
        { name: 'trending-up', Icon: IconTrendingUp },
        { name: 'question-mark', Icon: IconQuestionMark },
      ];

    return (
      <div className="my-5">
        <p>Icons</p>
        <div className=" mt-3 flex flex-wrap gap-2 justify-between">
        {
            dataIcons.map(({Icon, name}) => (
            <div 
              onClick={() => onSelectedIcon({name: name, Icon: Icon})}
              key={name} 
              className="border w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: onIcon?.name === name ?  "#FAECE7" : "#ffffff", 
                border: onIcon?.name === name ?  '1px solid #712B13' : '1px solid #000000' 
              }}
              >
                <Icon 
                  size={30}  
                  className="text-gray-600" 
                  style={{color: onIcon?.name === name ?  "#712B13" : "#000000"}}
                  />
            </div>
            ))
        }
        </div>
    </div>
    )
}

export default IconFormCategory;