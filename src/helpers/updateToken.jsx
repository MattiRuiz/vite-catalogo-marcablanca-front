let token = 'inicializado';

export const updateToken = () => {
  console.log('ANTES UDPATE TOKEN -->', token)
  token = window.localStorage.getItem('token');
  console.log('DESPUES UDPATE TOKEN --> ', token) 
};

export { token }; // Exporta la variable token
