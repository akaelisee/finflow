import {
  IconHome, IconShoppingCart, IconCar, IconMovie, IconHeart,
  IconBriefcase, IconGift, IconPlane, IconCoffee, IconBook,
  IconDeviceMobile, IconPigMoney, IconPaw, IconShirt, IconBolt,
  IconChefHat, IconFileInvoice, IconTrendingUp,
  type Icon,
} from '@tabler/icons-react';

export type IconSelection = {
  name: string;
  Icon: Icon;
};

type Props = {
  value: IconSelection | null;
  onChange: (selection: IconSelection) => void;
};

export const AVAILABLE_ICONS: IconSelection[] = [
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
];

export function CategoryIconPicker({ value, onChange }: Props) {
  return (
    <div className="my-5">
      <p>Icônes</p>
      <div className="mt-3 flex flex-wrap gap-2 justify-start lg:justify-between ">
        {AVAILABLE_ICONS.map(({ Icon, name }) => {
          const isSelected = value?.name === name;
          return (
            <div
              key={name}
              onClick={() => onChange({ name, Icon })}
              className="border w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: isSelected ? '#FAECE7' : '#ffffff',
                borderColor: isSelected ? '#712B13' : '#000000',
              }}
            >
              <Icon
                size={30}
                style={{ color: isSelected ? '#712B13' : '#000000' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}