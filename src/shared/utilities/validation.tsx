
import * as yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
const phoneRegExp =/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/; 

export const signupFormFields = {
    username: '',
    email: '',
    password: ''
};

export const loginFormFields = {
    email: '',
    password: ''
};

export const ResetFormField = {
    email: '',

};
export const newPasswordformfield = {
    password: '',
confirmPassword:""
};
export const TextUrlFields = {
    TextAction: '',
};

export const UrlFields = {
    UrlText: '',   
};

export const PhoneFields = {
    PhoneText: '',
};

export const ContextFiled = {
    ContectName: '',
    Company:"",
    Address:"",
    phoneNumber:"",
    webSite:"",
};

export const EmailField = {
    Email: '',
    EmailSubject:"",
    EmailBody:"",
};

export const SocialLinkFields = {
    SocailUrl: '',
};



export const Textschema = yup.object().shape({
    TextAction: yup
        .string()
        .required('Text is Required')
        .min(10, 'Text must be at least 10 characters')

});

export const Urlschema = yup.object().shape({
    
    UrlText: yup
        .string()
        .matches(URL, 'Enter a valid url')
        .required('Url is Required')
});

export const SocailLinkschema = yup.object().shape({
    SocailUrl: yup
        .string()
        .matches(URL, 'Enter a valid url')
        .required('Url is Required')
});

export const Phoneschema = yup.object().shape({
    PhoneText: yup
      .string()
      .required('Phone number is required')
    .matches(phoneRegExp, "Enter Valid phone number")
    .min(9, 'Text must be at least 9 Number')
    .max(15,'Text must be at least 15 Number')
  });
  
  export const ContectShema = yup.object().shape({
    ContectName: yup.string().required('Contact name is required'),
    Company: yup.string().required('Company name is required'),
    Address: yup.string().required('Address is required'),
    phoneNumber: yup
    .string()
    .required('Phone number is required')
  .matches(phoneRegExp, "Enter Valid phone number")
  .min(9, 'Text must be at least 9 Number')
  .max(15,'Text must be at least 15 Number'),
    webSite: yup.string().url('Invalid URL format').required('Website URL is required'),
  });


  export const EmailShema = yup.object().shape({
    Email: yup
    .string()
    .required('Email is Required')
    .email('Please provide a valid Email address'),
    EmailSubject: yup.string().required('EmailSubject is required'),
    EmailBody: yup.string().required('EmailBody is required'),
  });

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

export const ResetPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is Required')
        .email('Please provide a valid email address'),
});

export const NewPasswordSchema = yup.object().shape({
    password: yup.string()
    .min(6, 'Password too short - should be 6 chars minimum.')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null],"Passwords don't match")
    .required('Confirm Password is required'),
});



