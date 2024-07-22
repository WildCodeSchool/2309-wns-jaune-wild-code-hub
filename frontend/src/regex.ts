// Auth
export const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const pseudoRegex = /^[a-zA-Z0-9À-ÿ]{3,20}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

//Editor

export const fileNamePattern = /^[^\\\/:*?"<>|]+\.(js|css|html)$/;

//Check regex
export const checkRegex = (regex: RegExp, str: string) => {
  return regex.test(str);
};
