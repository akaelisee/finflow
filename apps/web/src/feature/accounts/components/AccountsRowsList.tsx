import { IconPlus, IconDots, IconBuildingBank } from '@tabler/icons-react';
import { Accounts } from '../types/accounts.types';
import { formatEuros } from '@/shared/lib/format';
import { Link } from 'react-router-dom';


type Props = {
  accounts : Accounts[]
}

export const AccountsRowsList = ({accounts}: Props) => {

    return(
     <div className="grid grid-cols-2 gap-3.5">
        {/* Carte compte */}
        {
          accounts.map((account) => (
            <div key={account.id} className="rounded-lg border border-[#E8E6DE] bg-white p-4">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F1FB] text-[#0C447C]">
                    <IconBuildingBank size={20} stroke={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="text-xs text-[#79776F]">{account.bank}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#79776F] hover:bg-[#F9F8F4]"
                >
                  <IconDots size={15} stroke={2} />
                </button>
              </div>

              <p className="text-2xl font-medium tabular-nums">{formatEuros(account.initialBalance)}</p>
              <p className="mb-3.5 mt-[3px] text-xs tabular-nums text-[#0F6E56]">+152 € ce mois</p>

              <svg viewBox="0 0 200 40" className="h-11 w-full" preserveAspectRatio="none">
                <polyline
                  points="0,25 22,22 40,28 60,20 80,24 100,18 120,15 140,20 160,14 180,10 200,8"
                  fill="none"
                  stroke="#378ADD"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="mt-3 flex justify-between text-xs text-[#79776F]">
                <span className="tabular-nums">147 transactions</span>
                <Link to={`/accounts/${account.id}`} className="cursor-pointer text-[#1C5E9E]">Voir détails →</Link>
              </div>
            </div>
          ))
        }
      </div>

    )
}