import { loginResponse } from "../assets/components/types";
import ApiService from "./ApiService";

const apiService = new ApiService();

const doLogin = (email: string, password: string): Promise<loginResponse> => {
  return apiService.post("/login", { email, password })
    .then((response) => {
      localStorage.setItem('token', response.token);
      return response; 
    })
    .catch((ex) => {
      console.error('Erro ao fazer login:', ex);
      throw ex;
    });
};


export default doLogin;