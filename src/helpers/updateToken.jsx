let token = '';

export const updateToken = () => {
  token = window.localStorage.getItem('token');
};

export { token }; // Exporta la variable token
