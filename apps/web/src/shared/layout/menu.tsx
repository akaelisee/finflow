import ImportIcon from '@/assets/icons/import-csv.svg';
import DashboardIcon from '@/assets/icons/dashboradIcon.svg';
import TransactionsIcon from '@/assets/icons/transactionIcon.svg';
import AccountsIcon from '@/assets/icons/accounts.svg';
import BudgetsIcon from '@/assets/icons/buldgetIcon.svg';
import SettingIcon from '@/assets/icons/settings.svg';
import CategoryIcon from '@/assets/icons/category.svg';
import HelpIcon from '@/assets/icons/help.svg';

export const MENU = [
  {
    title: 'Général',
    menu: [
      { id: 1, title: 'Dashboard', link: '/', icon: DashboardIcon },
      { id: 2, title: 'Transactions', link: '/transactions', icon: TransactionsIcon },
      { id: 3, title: 'Comptes', link: '/accounts', icon: AccountsIcon },
      { id: 4, title: 'Import CSV', link: '/imports', icon: ImportIcon },
    ],
  },
  {
    title: 'Gestion',
    menu: [
      { id: 1, title: 'Budgets', link: '/budgets', icon: BudgetsIcon },
      { id: 2, title: 'Catégories', link: '/categories', icon: CategoryIcon }, // 🐛 FIX : sans accent
    ],
  },
  {
    title: 'Compte',
    menu: [
      { id: 1, title: 'Paramètres', link: '/settings', icon: SettingIcon },
      { id: 2, title: 'Aide', link: '/help', icon: HelpIcon },
    ],
  },
];