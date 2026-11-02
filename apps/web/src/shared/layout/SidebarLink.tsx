import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  title: string;
  icon: string;
};

export function SidebarLink({ to, title, icon }: Props) {

  // className={({ isActive }) =>
  //       `flex gap-3 cursor-pointer p-2 rounded-md mx-auto lg:mx-0 ${
  //         isActive ? 'bg-[#E6F1FB] text-blue-700' : ''
  //       }`
  //     }
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => 
          `flex gap-3 cursor-pointer p-2 rounded-md mx-auto lg:mx-0 
          ${isActive ? 'bg-[#E6F1FB] text-blue-700' : ''}
        `
      }
    >
      <img className="w-7 lg:w-5" src={icon} alt="" />
      <span hidden className="lg:block">
        {title}
      </span>
    </NavLink>
  );
}