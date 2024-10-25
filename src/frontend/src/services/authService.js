export const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:3000/api/sessions/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include' // Incluir cookies en la solicitud
    });
  
    const data = await response.json();
    return data;
  };
  
  export const getCurrentUser = async () => {
    const response = await fetch('http://localhost:3000/api/sessions/current', {
      credentials: 'include'
    });
  
    return response.json();
  };
  