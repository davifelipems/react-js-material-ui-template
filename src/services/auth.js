export const TOKEN_KEY = "@application-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const setUser = (user) =>{
  localStorage.setItem('user', user);
}
export const setEmail = (email) =>{
  localStorage.setItem('email', email);
}
export const getUser = () => localStorage.getItem('user');
export const getEmail = () => localStorage.getItem('email');