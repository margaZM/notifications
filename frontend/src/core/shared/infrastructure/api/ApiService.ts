import { getToken } from "@/src/shared/utils/cookies";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export class ApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.initializeRequestInterceptors();
    this.initializeResponseInterceptors();
  }

  private initializeRequestInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private initializeResponseInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401) {
          const isLoginPage =
            typeof window !== "undefined" && window.location.pathname === "/login";
          if (!isLoginPage) {
            window.location.href = "/login";
          }
        }
        return Promise.reject(this.handleError(error));
      },
    );
  }

  private handleError(error: any) {
    const message = error.response?.data?.message || "Error desconocido en el servidor";
    return {
      message,
      status: error.response?.status,
      originalError: error,
    };
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }
}

/**
 * EJEMPLO DE IMPLEMENTACIÓN DE UN REPOSITORIO USANDO ESTE SERVICIO
 * Ubicación: src/core/infrastructure/repositories/ContactRepository.ts
 */

/*
export class ContactRepository extends ApiService {
  constructor() {
    super(); // Usa la baseURL por defecto
  }

  async fetchAllContacts(): Promise<Contact[]> {
    const dtos = await this.get<ContactDTO[]>('/contacts');
    return dtos.map(ContactMapper.toDomain);
  }
}
*/
