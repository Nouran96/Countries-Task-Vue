export const isValidEmail = (val: string): boolean | string => {
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(val)) {
    return "Invalid email";
  }
  // All is good
  return true;
};

export const isRequired = (val: string | null): boolean | string => {
  return (val && val.toString().trim().length > 0) || "Required";
};

export const isMinLength = (val: string, length: number): boolean | string => {
  return (
    (val && val.length >= length) || `Should have at least ${length} characters`
  );
};

export const isSamePassword = (
  val: string,
  password: string | null
): boolean | string => {
  return (val && password && val === password) || `Passwords not matching`;
};

export const isNumbersOnly = (val: string): boolean | string => {
  const numbersRegex = /^[0-9]*$/;
  const notEmpty = val && val.trim();

  return (
    (notEmpty && numbersRegex.test(val.trim())) || "Should be only numbers"
  );
};
