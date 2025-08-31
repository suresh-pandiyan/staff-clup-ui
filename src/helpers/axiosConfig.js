import axios from 'axios';

// console.log("API URL", process.env.REACT_APP_API_URL);

// Create axios instance with default config
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('authToken');

        // Add auth header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add timestamp for cache busting (optional)
        config.params = {
            ...config.params,
            _t: Date.now(),
        };

        //    console.log('Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        //console.log('Response:', response.status, response.config.url);
        return response?.data;
    },
    (error) => {
        console.error('Response Error:', error.response?.status, error.response?.data);

        // Handle specific error cases
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - redirect to login
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden
                    console.error('Access forbidden');
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found');
                    break;
                case 500:
                    // Server error
                    console.error('Server error');
                    break;
                default:
                    console.error('API Error:', data);
            }
        } else if (error.request) {
            // Network error
            console.error('Network error:', error.message);
        } else {
            // Other error
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// API helper functions
export const apiHelpers = {
    // GET request
    get: (url, config = {}) => api.get(url, config),

    // POST request
    post: (url, data = {}, config = {}) => api.post(url, data, config),

    // PUT request
    put: (url, data = {}, config = {}) => api.put(url, data, config),

    // PATCH request
    patch: (url, data = {}, config = {}) => api.patch(url, data, config),

    // DELETE request
    delete: (url, config = {}) => api.delete(url, config),

    // Upload file
    upload: (url, formData, config = {}) => {
        return api.post(url, formData, {
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...config.headers,
            },
        });
    },

    // Download file
    download: (url, config = {}) => {
        return api.get(url, {
            ...config,
            responseType: 'blob',
        });
    },
};

// Error handler utility
export const handleApiError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        return {
            status,
            message: data?.message || data?.error || 'An error occurred',
            data: data,
        };
    } else if (error.request) {
        return {
            status: 0,
            message: 'Network error. Please check your connection.',
            data: null,
        };
    } else {
        return {
            status: 0,
            message: error.message || 'An unexpected error occurred',
            data: null,
        };
    }
};

// Success response handler
export const handleApiSuccess = (response) => {
    return {
        status: response.status,
        data: response.data,
        message: response.data?.message || 'Success',
    };
};

export default api; 