type FormType = {
  pseudo: string;
  password: string;
  confirmPassword: string;
};
const validateRegistrationForm = (form: FormType) => {
  let error: string | null = null;

  if (form.pseudo.trim().length < 8) {
    error = 'Please chose a pseudo of atleast 8 characters';
  } else if (form.password.trim().length < 8) {
    error = 'Your password needs to be atleast 8 characters.';
  } else if (form.password.trim() !== form.confirmPassword.trim()) {
    error = 'Passwords do not match. Please confirm.';
  }

  return error;
};

export default validateRegistrationForm;
