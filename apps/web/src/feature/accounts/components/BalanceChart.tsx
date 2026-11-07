import {
  IconArrowLeft,
  IconEdit,
  IconDownload,
  IconTrash,
  IconBuildingBank,
  IconShoppingCart,
} from '@tabler/icons-react';
import { Accounts } from '@/feature/accounts/index';
import { formatEuros } from '@/shared/lib/format';

type Props = {
  account: Accounts;
};

export function BalanceChart({ account }: Props) {

  return (
      <div className="mb-5 rounded-lg bg-[#F9F8F4] p-5">
        <p className="text-xs text-[#79776F]">Solde actuel</p>
        <p 
          className="mt-1.5 text-[32px] font-medium tabular-nums"
          style={{ color: account.currentBalance && account.currentBalance < 0 ? '#A32D2D' : '#0F6E56' }}
        >{formatEuros(account?.currentBalance)}</p>
        <p className="mt-1 text-xs tabular-nums text-[#0F6E56]">+152 € ce mois-ci</p>

        <svg viewBox="0 0 400 80" className="mt-4 h-20 w-full" preserveAspectRatio="none">
          <polygon
            points="0,50 40,44 80,56 120,40 160,48 200,36 240,30 280,40 320,28 360,20 400,16 400,80 0,80"
            fill="#378ADD"
            fillOpacity="0.08"
          />
          <polyline
            points="0,50 40,44 80,56 120,40 160,48 200,36 240,30 280,40 320,28 360,20 400,16"
            fill="none"
            stroke="#378ADD"
            strokeWidth="1.5"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[11px] text-[#B4B1A6]">
          <span>Il y a 30 jours</span>
          <span>Aujourd'hui</span>
        </div>
      </div>
    )
}