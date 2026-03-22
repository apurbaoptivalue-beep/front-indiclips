import axios from "axios";

// Automatically fallback to our provided default if env is not loaded properly
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://13.51.175.46:8000/api/v1";

// Create a configured Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach the exact token for Auth endpoints
apiClient.interceptors.request.use(
  (config) => {
    // Only in browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardize error handling mapping
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || "An unexpected error occurred Backend API";
    return Promise.reject(new Error(message));
  }
);

/**
 * Backwards compatibility to replace the old native `fetchAPI` function
 * If you are sending FormData, Axios automatically sets the correct multipart/form-data boundary.
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
  // We clean up duplicate /api in case it exists, though Axios baseURL should handle valid endpoints
  const cleanEndpoint = endpoint.startsWith("/api") ? endpoint.replace("/api", "") : endpoint;
  
  const headers: any = options.headers || {};
  // Exclude content-type if the body is FormData (Axios automatically handles it)
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  try {
    const res = await apiClient({
      url: cleanEndpoint,
      method: options.method || "GET",
      data: options.body,
      headers: headers,
    });
    return res;
  } catch (error: any) {
    throw error;
  }
}
