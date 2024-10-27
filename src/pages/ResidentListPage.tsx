import { useEffect, useState } from 'react';
import SearchInput from '../assets/components/SearchInput';
import { debounce } from 'lodash';
import { getResidents } from '../service/AdminService';

const ResidentListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResidents = async (filter = '') => {
    setLoading(true);
    try {
      const response = await getResidents(filter);
      setResidents(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

  const handleSearchField = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  return (
    <div className="mx-auto px-4 mt-8">
      <div className='flex items-center mb-4'>
        <h1 className="text-3xl font-bold mr-4">Lista de Residentes</h1>
        <div className="relative mb-3" data-twe-input-wrapper-init>
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
