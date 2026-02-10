import axios from 'axios';

const API_BASE_URL = 'https://cinemaguide.skillbox.cc/';

export const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});
