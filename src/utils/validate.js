const validateEmail = email => {
  let isValid = true;
  let error = '';

  //メールのバリデーションをチェックする
  if (!email) {
    isValid = false;
    error = 'Please enter your email address.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    isValid = false;
    error = 'Please enter a valid email address.';
  } else if (email.length > 35) {
    isValid = false;
    error = 'Email must be less than 35 characters.';
  } else if (email.length < 7) {
    isValid = false;
    error = 'Email must be at least 7 characters.';
  } else {
    isValid = true;
    error = '';
  }
  return {isValid, error};
};

//　パスワードのバリデーションをチェックする
const validatePassword = password => {
  let isValid = true;
  let error = '';
  if (!password) {
    isValid = false;
    error = 'Please enter your password.';
  } else if (password.length > 50) {
    isValid = false;
    error = 'Password must be less than 50 characters.';
  } else if (password.length < 5) {
    isValid = false;
    error = 'Password must be at least 5 characters.';
  } else {
    isValid = true;
    error = '';
  }
  return {isValid, error};
};

//　パスワード確認のバリデーションをチェックする
const validateConfirmPassword = (password, confirmPassword) => {
  console.log(password, confirmPassword);
  let isValid = true;
  let error = '';
  if (!confirmPassword) {
    isValid = false;
    error = 'Please enter your confirm password.';
  } else if (password !== confirmPassword) {
    isValid = false;
    error = 'Confirm password does not match.';
  }
  return {isValid, error};
};

//　名前のバリデーションをチェックする
const validateName = (firstName, lastName) => {
  let isValid = true;
  let error = '';
  if (!firstName && !lastName) {
    isValid = false;
    error = 'Please enter your first name and last name.';
  } else if (!firstName) {
    isValid = false;
    error = 'Please enter your first name.';
  } else if (!lastName) {
    isValid = false;
    error = 'Please enter your last name.';
  } else if (firstName.length > 50 || lastName.length > 50) {
    isValid = false;
    error = 'Name must be less than 50 characters.';
  }
  return {isValid, error};
};

export {validateEmail, validatePassword, validateName, validateConfirmPassword};
