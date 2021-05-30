import * as yup from 'yup';
import { initCurrencyWidget } from './js/currency-widget';
import './scss/main.scss';

let form;
let schema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .min(7, 'Please enter valid email adress')
    .max(50, 'Please enter valid email adress')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email adress")
    .email('Email is not valid'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

const initForm = () => {
  form = document.getElementById('form');
  form.addEventListener('submit', onSubmit);
}

const showErrors = (e) => {
  const errors = e.inner.reduce((acc, i) => {
    if (!acc[i.path]) acc[i.path] = i.message;
    return acc;
  }, {});

  Object.keys(errors).forEach(key => {
    const errorWrapper = document.createElement('p');
    errorWrapper.classList.add('login-form__error-text')
    const errorText = document.createTextNode(errors[key]);
    errorWrapper.appendChild(errorText);
    document.getElementById(key).appendChild(errorWrapper);
    const addErrorStyles = document.getElementById(key);
    addErrorStyles.className = 'login-from__fields login-form__error';
  });
  
}

const clearErrors = () => {
  document.querySelectorAll('.login-form__error').forEach(el => el.classList.remove('login-form__error'));
  document.querySelectorAll('.login-form__error-text').forEach(el => el.remove());
}

const getFormData = () => {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

const validateData = async (data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return data;
  } catch (e) {
    throw e;
  }
}

const onSubmitSuccess = (data) => {
  console.log('Email:', data.email);
  console.log('Password:', data.password);
}

function onSubmit(e) {
  e.preventDefault();

  Promise.resolve()
    .then(clearErrors)
    .then(getFormData)
    .then(validateData)
    .then(onSubmitSuccess)
    .catch(showErrors);
}

window.addEventListener('DOMContentLoaded', () => {
  initForm();
  initCurrencyWidget();
});