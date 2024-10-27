import { Resident, User } from "../assets/components/types";
import ApiService from "./ApiService";

const apiService = new ApiService();

const getResidents = (filter: string): Promise<Resident[]> => {
    const currentToken = `Bearer ${localStorage.getItem('token')}`;
  
    return apiService.get(`/residentUpdateForm?filter=${filter}`, undefined, { Authorization: currentToken })
      .then((response) => {
        return response.content;
      })
      .catch((ex) => {
        console.error('Erro ao buscar residentes:', ex);
        throw ex;
      });
  };

  const getUsers = (filter: string): Promise<Resident[]> => {
    const currentToken = `Bearer ${localStorage.getItem('token')}`;
  
    return apiService.get(`/users?filter=${filter}`, undefined, { Authorization: currentToken })
      .then((response) => {
        return response.content;
      })
      .catch((ex) => {
        console.error('Erro ao buscar Users:', ex);
        throw ex;
      });
  };

export {getResidents, getUsers};
