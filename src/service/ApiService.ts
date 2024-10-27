import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;

  
  constructor(baseURL: string = "https://144.91.91.131:8654") {
  //constructor(baseURL: string = "http://localhost:8080") {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    });
  }

  // Método GET
  public async get<T>(
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    try {
      // Cria a configuração da requisição, incluindo params e headers
      const config: AxiosRequestConfig = {
        params,
        headers,
      };
      
      const response: AxiosResponse<T> = await this.api.get<T>(url, config);
      return response.data; // Retorna apenas os dados
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Método POST
  public async post<T>(url: string, data: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post<T>(url, data);
      return response.data; // Retorna apenas os dados
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Método PUT
  public async put<T>(url: string, data: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put<T>(url, data);
      return response.data; // Retorna apenas os dados
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Método DELETE
  public async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete<T>(url);
      return response.data; // Retorna apenas os dados
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Tratamento de erros
  private handleError(error: any): Error {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      console.log(error.response);
      return new Error(`Erro ${status}: ${data}`);
    }
    return new Error('Erro desconhecido ao fazer requisição.');
  }
}

export default ApiService;
