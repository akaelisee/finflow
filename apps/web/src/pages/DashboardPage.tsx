import React from 'react';

export const DashboardPage = () => {
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
          </>
    );
};
export default DashboardPage;