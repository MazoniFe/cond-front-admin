import { useEffect, useState } from 'react';
import SearchInput from '../assets/components/SearchInput';
import { debounce } from 'lodash';
import { deleteUser, getUsers } from '../service/AdminService';
import { User } from '../assets/components/types';
import { MdDeleteOutline } from "react-icons/md";
import UserCreationDialog from '../assets/components/UserCreationDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { overwriteUsers } from '../features/UserSlice';
import SimpleDialog from '../assets/components/DIalog';


const UserListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  const fetchUsers = async (filter = '') => {
    try {
      const response: User[] = await getUsers(filter);
      dispatch(overwriteUsers(response));
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedFetchUsers = debounce((filter: string) => {
    fetchUsers(filter);
  }, 300);

  useEffect(() => {
    debouncedFetchUsers(searchValue);
  }, [searchValue]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchField = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleCloseModal = () => {
    setShowCreateUserModal(false);
  }

  const handleOpenModal = () => {
    setShowCreateUserModal(true);
  }

  
  const handleDeleteUserModal = (id: number) => {
    setSelectedUserId(id); 
    setShowDeleteUserModal(true); 
  };

  const handleDeleteUser = async () => {
    if (selectedUserId !== null) {
      await deleteUser(selectedUserId);
      await fetchUsers();
      setShowDeleteUserModal(false); 
      setSelectedUserId(null);
    }
  };

  return (
    <div className="mx-auto px-4 mt-8">
      {showCreateUserModal && (
        <UserCreationDialog onClose={(() => handleCloseModal())}/>
      )}
      {showDeleteUserModal && (
        <SimpleDialog
          title="Remover Usuário"
          message="Você tem certeza que deseja remover este usuário? Isto não poderá ser desfeito."
          onConfirm={handleDeleteUser} 
          onClose={() => setShowDeleteUserModal(false)} 
        />
      )}
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-3xl font-bold">Usuários</h1>
        <div className='flex'>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            onClick={() => handleOpenModal()}
          >
            Adicionar
          </button>
          <div className="ml-4 relative" data-twe-input-wrapper-init>
            <SearchInput value={searchValue} onChange={handleSearchField} />
          </div>
        </div>

      </div>
      <div className="overflow-x-auto w-full h-full">
        {users.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nome Completo</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{user.id}</td>
                  <td className="py-3 px-6 text-left">{user.firstName} {user.lastName}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className='py-3 px-6 text-left'>
                    <MdDeleteOutline onClick={() => handleDeleteUserModal(user.id)} className='ml-2' size={25} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-64 text-center rounded-lg text-lg">
            Nenhum resultado encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListPage;
