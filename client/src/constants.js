export const API_URL = process.env.NODE_ENV === 'production' ? `${window.location.protocol}/api/v1/` : 'http://localhost:5000/api/v1/';
export const URL = process.env.NODE_ENV === 'production' ? `${window.location.protocol}` : 'http://localhost:5000';
