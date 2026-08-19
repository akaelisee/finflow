import React from 'react';
import RowsOverviewExpenses from "@/components/dasboard/rowsOverviewExpenses";
import GraphCategory from '@/components/dasboard/graphCategory';
import RecentTransactions from '@/components/dasboard/recentTransactions';
import BudgetsOfmonths from '@/components/dasboard/budgetsOfmonths';

const Dashboard = () => {
    return (
          <>
            <div className="flex justify-between">
              <div className="">
                <p className='text-2xl font-semibold'>Bonjour, Sarah</p>
                <span>Vue d'ensemble · Mai 2026</span>
              </div>
              <div className="">
                <select className='border rounded-md py-2 px-9' name="" id="">
                  <option value="">Ce mois</option>
                </select>
              </div>
            </div>
            {/* vue d'ensemble */}
            <RowsOverviewExpenses />

            {/* transaction and depense */}
              <div className="grid grid-cols-2 gap-4 mt-10 mb-10">
                <GraphCategory />
                <RecentTransactions />
                <BudgetsOfmonths />
            </div>
          </>
    );
};
export default Dashboard;