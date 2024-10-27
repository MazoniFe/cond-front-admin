import { useEffect, useState } from 'react';
import SearchInput from '../assets/components/SearchInput';
import { debounce } from 'lodash';
import { getReports } from '../service/AdminService';
import { Report } from '../assets/components/types';
import { RootState } from '../store/store'; // Importe o tipo RootState
import { useDispatch, useSelector } from 'react-redux';
import { overwriteReports } from '../features/ReportSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ReportListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const reports = useSelector((state: RootState) => state.report.reports);
  const navigate = useNavigate();

  const fetchReports = async (filter = '') => {
    try {
      const response: Report[] = await getReports(filter);
      dispatch(overwriteReports(response));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 500) {
          navigate("/login");
        }
      }
      console.log(err);
    }
  };

  const debouncedFetchUsers = debounce((filter: string) => {
    fetchReports(filter);
  }, 300);

  useEffect(() => {
    debouncedFetchUsers(searchValue);
  }, [searchValue]);

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSearchField = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  return (
    <div className="mx-auto px-4 mt-8">
      <div className='flex items-center justify-between mb-4'>
        <h1 className="text-3xl font-bold">Usuários</h1>
        <div className="relative" data-twe-input-wrapper-init>
          <SearchInput value={searchValue} onChange={handleSearchField} />
        </div>
      </div>
      <div className="overflow-x-auto w-full h-full">
        {reports.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Realizado por:</th>
                <th className="py-3 px-6 text-left">Ação</th>
                <th className="py-3 px-6 text-left">Antes</th>
                <th className="py-3 px-6 text-left">Depois</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{report.id}</td>
                  <td className="py-3 px-6 text-left">{report.user.firstName} {report.user.lastName}</td>
                  <td className="py-3 px-6 text-left">{report.action}</td>
                  <td className="py-3 px-6 text-left">{report.beforeAction}</td>
                  <td className="py-3 px-6 text-left">{report.afterAction}</td>
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

export default ReportListPage;
