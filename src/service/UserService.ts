import { loginResponse } from './../assets/components/types';
import ApiService from "./ApiService";

const apiService = new ApiService();

const doLogin = (email: string, password: string): Promise<loginResponse> => {
  return apiService.post<loginResponse>("/login", { email, password })
    .then((response: loginResponse) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem("fullName", `${response.user.firstName} ${response.user.lastName}`);
      localStorage.setItem("access", `${response.user.accessType}`);
      return response; 
    })
    .catch((ex) => {
      console.error('Erro ao fazer login:', ex);
      throw ex;
    });
};


export default doLogin;
