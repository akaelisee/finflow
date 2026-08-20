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
  type IconProps,
} from '@tabler/icons-react';

// Map "nom en base" → composant React
const ICONS = {
  'home': IconHome,
  'shopping-cart': IconShoppingCart,
  'car': IconCar,
  'movie': IconMovie,
  'heart': IconHeart,
  'briefcase': IconBriefcase,
  'gift': IconGift,
  'plane': IconPlane,
  'coffee': IconCoffee,
  'book': IconBook,
  'device-mobile': IconDeviceMobile,
  'pig-money': IconPigMoney,
  'paw': IconPaw,
  'shirt': IconShirt,
  'bolt': IconBolt,
  'chef-hat': IconChefHat,
  'file-invoice': IconFileInvoice,
  'trending-up': IconTrendingUp,
} as const;

type Props = IconProps & {
  name: string;
};

export function CategoryIcon({ name, ...rest }: Props) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? IconQuestionMark;
  return <Icon {...rest} />;
}