import { Link } from "react-router-dom";
import ImportIcon  from "../assets/icons/import-csv.svg";   
import DashboardIcon from "../assets/icons/dashboradIcon.svg";
import TransactionsIcon from "../assets/icons/transactionIcon.svg";
import AccountsIcon from "../assets/icons/accounts.svg";
import BudgetsIcon from "../assets/icons/buldgetIcon.svg";  

const Aside = () => {

     const menu = [
        {id: 1, title: 'Dashboard', link: '', icon: DashboardIcon },
        {id: 2, title: 'Transaction', link: 'transaction', icon: TransactionsIcon },
        {id: 3, title: 'Accounts', link: 'accounts', icon: AccountsIcon },
        {id: 4, title: 'Imports CSV', link: 'imports', icon: ImportIcon },
        {id: 5, title: 'Budgets', link: 'budgets', icon: BudgetsIcon }
     ];

    return ( 
        <div className="fixed left-0 z-20 bg-[#F9F8F4] min-w-20 h-screen border-gray-200 border-r-2 lg:min-w-72">
                <div className=" mx-auto w-auto center h-[92%] mt-12 flex flex-col justify-between lg:w-3/4">
                  <div className="flex flex-col gap-7 relative">
                    <div className="flex relative items-center gap-x-4">
                      <div className="w-12 h-12 p-4 rounded-lg bg-[#378ADD] border-0 relative mx-auto lg:mx-0">
                        <div className='absolute text-white font-semibold text-2xl top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2'>F</div>
                      </div>
                      <span className='font-semibold text-2xl hidden lg:block'>FinFlow</span>
                    </div>
                    <ul className='flex flex-col gap-3'>
                      {
                        menu.map((menuItem, index) => (
                          <li key={menuItem.id} className='_bg-[#E6F1FB] rounded-md flex gap-3 cursor-pointer p-2 mx-auto lg:mx-0'>
                            <Link to={menuItem.link} className='flex gap-3 cursor-pointer'> 
                              <img className='w-7 lg:w-5' src={menuItem.icon}  />
                              <span hidden  className='lg:block'>{menuItem.title}</span>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="">
                    <hr className='border-1.5' />
                    <div className="flex flex-row gap-3 mt-4 items-center">
                        <div className="w-8 h-8 p-4 rounded-full bg-[#378ADD] border-0 relative mx-auto lg:mx-0">
                          <div className='absolute text-white font-normal text-sm top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2'>SD</div>
                        </div>
                        <div className="flex-col -gap-2 mb-2 hidden lg:flex">
                          <p className='font-semibold text-md'>sara D.</p>
                          <span className='text-xs text-gray-500'>Membre</span>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
     );
}
 
export default Aside;
