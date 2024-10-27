import { Link, useLocation } from 'react-router-dom';
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

function getUserType() {
  return localStorage.getItem('access'); // ou sessionStorage.getItem('userType');
}


function getUserOptions(): IOptionProps[] {
  const userType = getUserType();
  let options: IOptionProps[] = [];

  if (userType === "SUPER_ADMIN") {
    options = [
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
  } else if (userType === "DEFAULT") {
    options = [
      {
        text: "Sair",
        icon: RxExit,
        path: "/",
      },
    ];
  } else if (userType === "ADMIN") {
    options = [
      {
        text: "Moradores",
        icon: FaPeopleRoof,
        path: "/admin/residents",
      },
      {
        text: "Sair",
        icon: RxExit,
        path: "/",
      },
    ];
  } else {
    // Caso o userType não seja reconhecido
    options = [
      {
        text: "Sair",
        icon: RxExit,
        path: "/",
      },
    ];
  }

  return options;
}

const MenuSideBar = () => {
  const location = useLocation(); // Obter a localização atual

  return (
    <div className="h-full w-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 self-center mt-4">
        <h1 className="text-xl font-bold">Campos do Sul</h1>
      </div>
      <nav className="mt-10">
        <ul>
          {getUserOptions().map((option, index) => {
            const isActive = location.pathname === option.path; // Verifica se o caminho atual é o da opção
            return (
              <li key={index} className={`px-4 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                <div className='flex items-center'>
                  <option.icon size={iconSize} />
                  <Link to={option.path} className={`block p-4 ${isActive ? 'font-bold' : ''}`}>
                    {option.text}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MenuSideBar;
