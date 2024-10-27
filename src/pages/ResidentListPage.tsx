import { ChangeEvent, useEffect, useState } from 'react';
import SearchInput from '../assets/components/SearchInput';
import { debounce } from 'lodash';
import { getResidents } from '../service/AdminService';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { overwriteResidents } from '../features/ResidentSlice';

const ResidentListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const residents = useSelector((state: RootState) => state.resident.Residents);

  const fetchResidents = async (filter = '') => {
    try {
      const response = await getResidents(filter);
      dispatch(overwriteResidents(response)); 
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedFetchResidents = debounce((filter) => {
    fetchResidents(filter);
  }, 300);

  useEffect(() => {
    debouncedFetchResidents(searchValue);
  }, [searchValue]);

  useEffect(() => {
    fetchResidents(); 
  }, []);

  const handleSearchField = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
};
  return (
    <div className="mx-auto px-4 mt-8">
      <div className='flex items-center justify-between mb-4'>
        <h1 className="text-3xl font-bold">Moradores</h1>
        <div className="relative" data-twe-input-wrapper-init>
          <SearchInput value={searchValue} onChange={handleSearchField} />
        </div>
      </div>
      <div className="overflow-x-auto w-full h-full">
        {residents.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nome Completo</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Apartamento</th>
                <th className="py-3 px-6 text-left">Torre</th>
                <th className="py-3 px-6 text-left">Telefone</th>
                <th className="py-3 px-6 text-left">Veículo</th>
                <th className="py-3 px-6 text-left">Data de Atualização</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {residents.map((resident) => (
                <tr key={resident.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{resident.id}</td>
                  <td className="py-3 px-6 text-left">{resident.fullName}</td>
                  <td className="py-3 px-6 text-left">{resident.resident_email}</td>
                  <td className="py-3 px-6 text-left">{resident.apartment}</td>
                  <td className="py-3 px-6 text-left">{resident.tower}</td>
                  <td className="py-3 px-6 text-left">{resident.phoneNumber}</td>
                  <td className="py-3 px-6 text-left">{resident.hasVehicle === 'yes' ? resident.vehiclePlates : 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{resident.updateDate}</td>
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

export default ResidentListPage;
