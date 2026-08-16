import Aside from '@/layouts/aside';
import React from 'react';
   
import { Link, Outlet } from 'react-router-dom';
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
                <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-4">
                    <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
                        <span className='text-gray-500'>Solde total</span>
                        <span className='text-2xl font-semibold'>4 285 €</span>
                        <span>+2,3 %</span>
                    </div>
                    <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
                        <span className='text-gray-500'>Solde total</span>
                        <span className='text-2xl font-semibold'>4 285 €</span>
                        <span>+2,3 %</span>
                    </div>
                    <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
                        <span className='text-gray-500'>Solde total</span>
                        <span className='text-2xl font-semibold'>4 285 €</span>
                        <span>+2,3 %</span>
                    </div>
                    <div className="flex flex-col gap-3 bg-[#F9F8F4] rounded-md p-4">
                        <span className='text-gray-500'>Solde total</span>
                        <span className='text-2xl font-semibold'>4 285 €</span>
                        <span>+2,3 %</span>
                    </div>
                </div>

                {/* transaction and depense */}
                  <div className="grid grid-cols-2 gap-4 mt-10">
                    <div className="flex flex-col gap-3 bg-white border rounded-md p-4">
                        <span className='text-gray-500'>Solde total</span>
                        <span className='text-2xl font-semibold'>4 285 €</span>
                        <span>+2,3 %</span>
                    </div>
                    <div className="flex flex-col gap-3 bg-white border rounded-md p-6">
                        <span className=' font-semibold'>Transactions récentes</span>
                        <div className='flex justify-between'>
                          <p className='flex flex-col gap-0'>
                            <span className='font-semibold'>Carrefour City</span>
                            <span className='text-sm text-gray-500'>Alimentation · 08 mai</span>
                          </p>
                          <span className='text-red-700 font-semibold'>-42,80 €</span>
                        </div>
                        <div className='flex justify-between'>
                          <p className='flex flex-col gap-0'>
                            <span className='font-semibold'>Carrefour City</span>
                            <span className='text-sm text-gray-500'>Alimentation · 08 mai</span>
                          </p>
                          <span className='text-red-700 font-semibold'>-42,80 €</span>
                        </div>
                        <div className='flex justify-between'>
                          <p className='flex flex-col gap-0'>
                            <span className='font-semibold'>Carrefour City</span>
                            <span className='text-sm text-gray-500'>Alimentation · 08 mai</span>
                          </p>
                          <span className='text-red-700 font-semibold'>-42,80 €</span>
                        </div>
                        <div className='flex justify-between'>
                          <p className='flex flex-col gap-0'>
                            <span className='font-semibold'>Carrefour City</span>
                            <span className='text-sm text-gray-500'>Alimentation · 08 mai</span>
                          </p>
                          <span className='text-red-700 font-semibold'>-42,80 €</span>
                        </div>
                    </div>
                </div>
              </>
    );
};
export default Dashboard;