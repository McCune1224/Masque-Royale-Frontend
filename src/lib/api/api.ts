import { PUBLIC_BACKEND_URL } from '$env/static/public';

export class ApiError extends Error {
	constructor(
		message: string,
		public status: number
	) {
		super(message);
		this.name = 'ApiError';
	}
}

export class ApiClientBase {
	private baseUrl: string;

	constructor(baseUrl: string = PUBLIC_BACKEND_URL) {
		this.baseUrl = baseUrl;
	}

	private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			headers: {
				'Content-Type': 'application/json',
				...options?.headers
			},
			...options
		});
		if (!response.ok) {
			const errorResponse = await response.json();
			throw new ApiError(response.statusText || errorResponse.message, response.status);
		}

		return response.json() as Promise<T>;
	}

	public get<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint);
	}

	public post<T>(endpoint: string, body: any): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'POST',
			body: JSON.stringify(body)
		});
	}

	public put<T>(endpoint: string, body: any): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'PUT',
			body: JSON.stringify(body)
		});
	}

	public delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'DELETE'
		});
	}
}
