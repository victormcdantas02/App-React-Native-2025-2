export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidUsername = (username: string): boolean => {
  return username.length >= 3;
};

export const validateSignUpForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): { isValid: boolean; error?: string } => {
  if (!username.trim() || !email.trim() || !password.trim()) {
    return { isValid: false, error: 'Preencha todos os campos obrigatórios' };
  }

  if (!isValidUsername(username)) {
    return { isValid: false, error: 'Nome de usuário deve ter no mínimo 3 caracteres' };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'E-mail inválido' };
  }

  if (!isValidPassword(password)) {
    return { isValid: false, error: 'A senha deve ter no mínimo 6 caracteres' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'As senhas não coincidem' };
  }

  return { isValid: true };
};

export const validateLoginForm = (
  username: string,
  password: string
): { isValid: boolean; error?: string } => {
  if (!username.trim() || !password.trim()) {
    return { isValid: false, error: 'Preencha todos os campos' };
  }

  return { isValid: true };
};