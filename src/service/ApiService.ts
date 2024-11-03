import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;

  
  constructor(baseURL: string = "https://api.camposdosul.com.br:8654") {
  // constructor(baseURL: string = "http://localhost:8080") {
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

  public async post<T>(
    url: string,
    data: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers,
      };
  
      const response: AxiosResponse<T> = await this.api.post<T>(url, data, config);
      return response.data; 
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<T>(url: string, data: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put<T>(url, data);
      return response.data; // Retorna apenas os dados
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers,
      };
  
      const response: AxiosResponse<T> = await this.api.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
  
      // Redireciona para /login se o status for 401 (não autorizado) ou 403 (proibido)
      if (status === 401 || status === 403 || status === 500) {
        window.location.href = '/';
      }
  
      return new Error(`Erro ${status}: ${data}`);
    }
    return new Error('Erro desconhecido ao fazer requisição.');
  }
}

export default ApiService;
