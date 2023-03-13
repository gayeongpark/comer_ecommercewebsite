import axios from 'axios';

//Interceptors are functions that can be used to modify requests or responses before they are sent or received.
//In this case, interceptors are being used to automatically refresh the user's access token when it has expired.
//By using an interceptor, the process of refreshing the access token can be handled automatically without the need for the user to manually log in again, providing a better user experience.

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await axios.post(
          '/auth/refreshtoken',
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          return axios(error.config);
        }
      } catch (err) {
        // Handle error from refresh token request
        console.error('Error refreshing token:', err);
        throw err;
      }
    } else {
      // Handle other error responses
      console.error('Error:', error);
      throw error;
    }
  }
);
