import { InsertUserDTO, Pageable, Report, Resident, User } from "../assets/components/types";
import ApiService from "./ApiService";


const apiService = new ApiService();

const getResidents = (filter: string): Promise<Resident[]> => {
  const currentToken = `Bearer ${localStorage.getItem('token')}`;

  return apiService.get<Pageable<Resident>>(`/residentUpdateForm?filter=${filter}`, undefined, { Authorization: currentToken })
    .then((response) => response.content)
    .catch((ex) => {
      console.error('Erro ao buscar residentes:', ex);
      throw ex; 
    });
};

const getUsers = (filter: string): Promise<User[]> => {
  const currentToken = `Bearer ${localStorage.getItem('token')}`;

  return apiService.get<Pageable<User>>(`/users?filter=${filter}`, undefined, { Authorization: currentToken })
    .then((response) => response.content)
    .catch((ex) => {
      console.error('Erro ao buscar usuários:', ex);
      throw ex; 
    });
};

const postUser = (data: InsertUserDTO): Promise<User> => {
  const currentToken = `Bearer ${localStorage.getItem('token')}`;

  return apiService.post<User>(`/users`, { ...data }, { Authorization: currentToken })
    .then((response) => response)
    .catch((ex) => {
      console.error('Erro ao criar usuário:', ex);
      throw ex;
    });
};

const deleteUser = (id: number): Promise<void> => {
  const currentToken = `Bearer ${localStorage.getItem('token')}`;

  return apiService.delete<void>(`/users/${id}`, { Authorization: currentToken })
    .then((response) => response)
    .catch((ex) => {
      console.error('Erro ao deletar usuário:', ex);
      throw ex; 
    });
};

const getReports = (filter: string): Promise<Report[]> => {
  const currentToken = `Bearer ${localStorage.getItem('token')}`;

  return apiService.get<Pageable<Report>>(`/reports?filter=${filter}`, undefined, { Authorization: currentToken })
    .then((response) => response.content)
    .catch((ex) => {
      console.error('Erro ao buscar relatórios:', ex);
      throw ex;
    });
};

export {getResidents, getUsers, getReports, postUser, deleteUser};
