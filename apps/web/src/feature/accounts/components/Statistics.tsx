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

export function Statistics({ account }: Props) {

  return (
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Revenus (mois)</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums text-[#0F6E56]">+3 200 €</p>
        </div>
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Dépenses (mois)</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums text-[#A32D2D]">-3 048 €</p>
        </div>
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Transactions</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums">{account?.transactionCount || 0}</p>
        </div>
      </div>
    )
}