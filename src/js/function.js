export const getLocal = (value) => {
  return localStorage.getItem(value);
};

export const setLocal = ({ key, value }) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
