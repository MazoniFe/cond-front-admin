import { Link } from 'react-router-dom';
import { IoIosPeople } from "react-icons/io";
import { FaPeopleRoof } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RxExit } from "react-icons/rx";

import { IconType } from 'react-icons';

const iconSize: number = 25;

interface IOptionProps {
  text: string;
  icon: IconType;
  path: string;
}

const options: IOptionProps[] = [
  {
    text: "Usuários",
    icon: IoIosPeople,
    path: "/admin/users",
  },
  {
    text: "Moradores",
    icon: FaPeopleRoof,
    path: "/admin/residents",
  },
  {
    text: "Relatórios",
    icon: HiOutlineDocumentReport,
    path: "/admin/reports",
  },
  {
    text: "Sair",
    icon: RxExit,
    path: "/",
  },
];

const MenuSideBar = () => {
  return (
    <div className="h-full w-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 self-center mt-4">
        <h1 className="text-xl font-bold">Meu App</h1>
      </div>
      <nav className="mt-10">
        <ul>
          {options.map((option, index) => (
            <li key={index} className='px-4 hover:bg-gray-700'>
              <div className='flex items-center'>
                <option.icon size={iconSize} /> {/* Usando o ícone da opção */}
                <Link to={option.path} className="block p-4">
                  {option.text} {/* O texto da opção */}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuSideBar;
