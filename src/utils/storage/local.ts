const STORAGE_KEY = '@Pontua/desafio'
type theme = 'light' | 'dark' 

const getTheme = (): theme => { 
  return (localStorage.getItem(`${STORAGE_KEY}/theme`) || 'light') as theme;
};
const setTheme = (payload: theme) => {
  localStorage.setItem(`${STORAGE_KEY}/theme`, payload);
}
const setHeroe = (payload: string) => {
  localStorage.setItem(`${STORAGE_KEY}/selected-heroe`, payload);
}

export {
  setHeroe,
  getTheme,
  setTheme
};