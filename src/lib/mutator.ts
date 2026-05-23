import type { AxiosRequestConfig } from 'axios';
import { api } from './axios';

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
	return api.request(config).then((response) => response.data);
};

export default customInstance;
