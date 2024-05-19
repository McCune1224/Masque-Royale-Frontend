import { PUBLIC_BACKEND_URL } from '$env/static/public';


interface ApiError {
  message: string;
}

export async function fetchWrapper<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${PUBLIC_BACKEND_URL}${endpoint}`, options);
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}


// export async function createUser(userData: UserCreationData): Promise<User> {
//   return fetchWrapper<User>('/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(userData)
//   });
// }
