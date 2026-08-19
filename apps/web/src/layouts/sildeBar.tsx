import { Link } from "react-router-dom"; 
import DeconnexionIcon from "@/assets/icons/deconnexion.svg"; 
import { MENU } from "@/utils/menu";
import Logo from "./logo";

const SildeBar = () => {

    return ( 
        <div className="fixed left-0 z-20 bg-[#F9F8F4] min-w-20 h-screen border-gray-200 border-r-2 lg:min-w-72">
                <div className=" mx-auto w-auto center h-[92%] mt-12 flex flex-col justify-between lg:w-3/4">
                  <div className="flex flex-col gap-7 relative">
                    <Logo />
                    {/* navBar */}
                    <div>
                      {
                        MENU.map((menusGroup, index) => (
                          <div key={index}>
                            <p className="uppercase text-gray-400 mb-3 text-sm text-center lg:text-left">{menusGroup.title}</p>
                            <ul className='flex flex-col gap-0.5 mb-6'>
                              {
                                menusGroup.menu.map((menuItem) => (
                                  <li key={menuItem.id} className='_bg-[#E6F1FB] rounded-md flex gap-3 cursor-pointer p-2 mx-auto lg:mx-0 bg-slate-50'>
                                    <Link to={menuItem.link} className='flex gap-3 cursor-pointer'> 
                                      <img className='w-7 lg:w-5' src={menuItem.icon}  />
                                      <span hidden  className='lg:block'>{menuItem.title}</span>
                                    </Link>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        ))
                      }
                    </div>
                    
                  </div>
                  <div>
                    <hr className='border-1.5' />
                    <div className="flex flex-row gap-3 mt-4 justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 p-4 rounded-full bg-[#378ADD] border-0 relative mx-auto lg:mx-0">
                          <div className='absolute text-white font-normal text-sm top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2'>SD</div> 
                        </div>
                        <div className="flex-col -gap-2 mb-2 hidden lg:flex">
                          <p className='font-semibold text-md'>sara D.</p>
                          <span className='text-xs text-gray-500'>Membre</span>
                        </div>
                      </div>
                        <div className="">
                            <img className='w-7 lg:w-5' src={DeconnexionIcon}  />
                        </div>
                    </div>
                  </div>
                </div>
            </div>
     );
}
 
export default SildeBar;
