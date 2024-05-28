import { PUBLIC_BACKEND_URL } from '$env/static/public';

export interface ApiResponse<T = any> {
	success: boolean;
	data: T;
}

export async function fetchWrapper<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${PUBLIC_BACKEND_URL}${endpoint}`, options);
	if (!response.ok) {
		const error: ApiError = await response.json();
		throw new Error(error.message || `API request failed on endpoint ${endpoint}`);
	}
	return response.json();
}

export async function postRequest<T, U>(endpoint: string, requestData: T): Promise<ApiResponse<U>> {
	try {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestData)
		};

		return fetchWrapper<ApiResponse<U>>(endpoint, options);
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}
