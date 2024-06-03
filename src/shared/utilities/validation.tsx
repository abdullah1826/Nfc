import * as yup from 'yup';

export const signupFormFields = {
    username: '',
    email: '',
    password: ''
};

export const loginFormFields = {
    email: '',
    password: ''
};


export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is Required')
        .email('Please provide a valid email address'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is Required')
});

export const signupSchema = yup.object().shape({
    username: yup
        .string()
        .required('Name is Required')
        .label('username'),
    email: yup
        .string()
        .required('Email is Required')
        .email('Please provide a valid email address'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is Required')
});

