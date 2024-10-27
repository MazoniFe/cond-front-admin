import { useEffect, useState } from 'react';
import SearchInput from '../assets/components/SearchInput';
import { debounce } from 'lodash';
import { getUsers } from '../service/AdminService';
import { User } from '../assets/components/types';

const UserListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async (filter = '') => {
    try {
      const response : User[] = await getUsers(filter);
      setUsers(response);
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

  return (
    <div className="mx-auto px-4 mt-8">
      <div className='flex items-center mb-4'>
        <h1 className="text-3xl font-bold mr-4">Lista de Usuários</h1>
        <div className="relative mb-3" data-twe-input-wrapper-init>
          <SearchInput value={searchValue} onChange={handleSearchField} />
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
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{user.id}</td>
                  <td className="py-3 px-6 text-left">{user.firstName + user.lastName}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
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
