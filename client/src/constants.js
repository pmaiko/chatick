export const API_URL = process.env.NODE_ENV === 'production' ? `${window.location.protocol}//api/v1/.${window.location.hostname}` : 'http://localhost:5000/api/v1/';
