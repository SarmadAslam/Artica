export const signUpFormControls = [
    {
      name: 'userName',
      type: 'text',
      label: 'Username',
      componentType: 'input',
      value: '',
      errorMessage: '',
      valid: false,
      placeholder: 'Enter username',
    },
    {
      name: 'userEmail',
      type: 'email',
      label: 'User Email',
      componentType: 'input',
      value: '',
      errorMessage: '',
      valid: false,
      placeholder: 'Enter your email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      componentType: 'input',
      value: '',
      errorMessage: '',
      valid: false,
      placeholder: 'Enter password',
    },
  ];

  export const signInFormControls = [
    {
      name: 'userEmail',
      type: 'email',
      label: 'User Email',
      componentType: 'input',
      value: '',
      errorMessage: '',
      valid: false,
      placeholder: 'Enter your email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      componentType: 'input',
      value: '',
      errorMessage: '',
      valid: false,
      placeholder: 'Enter password',
    },
  ];

  export const initialSignUpFormData = [
    {
        userName : '',
        userEmail : '',
        password : ''
    }

  ]

  export const initialSignInFormData = [
    {
        userEmail : '',
        password : ''
    }

  ]
  