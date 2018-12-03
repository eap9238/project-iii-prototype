// handleLogin()
const handleLogin = e => {
  // Preventing default redirect behavior + hiding the Domo error
  e.preventDefault();
  $('#domoMessage').animate({ width: 'hide' }, 350);

  // IF not all the fields are filled in...
  if ($('#inputEmail').val() == '' || $('#inputPassword').val() == '') {
    handleError("Either Username or password fields are blank");
    return false;
  }

  console.log($('input[name=_csrf]').val());

  sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);

  return false;
};

// handleSignup()
const handleSignup = e => {
  // Preventing default redirect behavior + hiding the Domo error
  e.preventDefault();
  $('#domoMessage').animate({ width: 'hide' }, 350);

  // IF not all of the fields are filled in...
  if ($('#inputEmail').val() == '' || $('#inputPassword').val() == '' || $('#inputPassword2').val() == '') {
    handleError("Please select options for all fields");
    return false;
  }

  // IF both password fields are not the same...
  if ($('#inputPassword').val() !== $('#inputPassword2').val()) {
    handleError("Passwords do not match");
    return false;
  }

  // 
  sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);

  return false;
};

// LoginWindow()
const LoginWindow = props => {
  return React.createElement(
    'div',
    { className: 'text-center', id: 'bodyContainer' },
    React.createElement(
      'form',
      { className: 'form-signin mainForm',
        id: 'loginForm',
        name: 'loginForm',
        onSubmit: handleLogin,
        action: '/login',
        method: 'POST'
      },
      React.createElement('img', { className: 'mb-4', src: '/assets/img/face.png', alt: '', width: '146', height: '146' }),
      React.createElement('br', null),
      React.createElement(
        'h1',
        { className: 'h3 mb-3 font-weight-normal' },
        'Please sign in'
      ),
      React.createElement('br', null),
      React.createElement(
        'label',
        { 'for': 'inputEmail', className: 'sr-only' },
        'Email address'
      ),
      React.createElement('input', { id: 'inputEmail', type: 'text', name: 'username', className: 'form-control', required: true, autofocus: true, placeholder: 'Username' }),
      React.createElement(
        'label',
        { 'for': 'inputPassword', className: 'sr-only' },
        'Password'
      ),
      React.createElement('input', { type: 'password', name: 'pass', id: 'inputPassword', className: 'form-control', required: true, placeholder: 'Password' }),
      React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
      React.createElement('br', null),
      React.createElement(
        'button',
        { className: 'formSubmit btn btn-lg btn-primary btn-block', type: 'submit', type: 'submit' },
        'Sign in'
      ),
      React.createElement('br', null),
      React.createElement(
        'p',
        { 'class': 'mt-5 mb-3 text-muted' },
        '\xA9 2018-2019'
      )
    )
  );
};

// SignupWindow()
const SignupWindow = props => {
  return React.createElement(
    'div',
    { className: 'text-center', id: 'bodyContainer' },
    React.createElement(
      'form',
      { className: 'form-signin mainForm',
        id: 'signupForm',
        name: 'signupForm',
        onSubmit: handleSignup,
        action: '/signup',
        method: 'POST'
      },
      React.createElement('img', { className: 'mb-4', src: '/assets/img/face.png', alt: '', width: '146', height: '146' }),
      React.createElement('br', null),
      React.createElement(
        'h1',
        { className: 'h3 mb-3 font-weight-normal' },
        'Select a username and password'
      ),
      React.createElement('br', null),
      React.createElement(
        'label',
        { htmlFor: 'username', className: 'sr-only' },
        'Email address'
      ),
      React.createElement('input', { id: 'inputEmail', type: 'text', name: 'username', className: 'form-control', required: true, autofocus: true, placeholder: 'Username' }),
      React.createElement(
        'label',
        { htmlFor: 'inputPassword', className: 'sr-only' },
        'Password'
      ),
      React.createElement('input', { id: 'inputPassword', name: 'inputPassword', type: 'password', className: 'form-control', required: true, placeholder: 'Password' }),
      React.createElement(
        'label',
        { htmlFor: 'inputPassword2', className: 'sr-only' },
        'Password'
      ),
      React.createElement('input', { id: 'inputPassword2', name: 'inputPassword2', type: 'password', className: 'form-control', required: true, placeholder: 'retype password' }),
      React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
      React.createElement('br', null),
      React.createElement(
        'button',
        { className: 'formSubmit btn btn-lg btn-primary btn-block', type: 'submit', type: 'submit' },
        'Sign Up'
      ),
      React.createElement('br', null),
      React.createElement(
        'p',
        { 'class': 'mt-5 mb-3 text-muted' },
        '\xA9 2018-2019'
      )
    )
  );
};

// createLoginWindow()
const createLoginWindow = csrf => {
  console.log('Create Login Window');
  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector('#content'));
};

// createSignupWindow()
const createSignupWindow = csrf => {
  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector('#content'));
};

// setup()
const setup = csrf => {
  const loginButton = document.querySelector('#loginButton');
  const signupButton = document.querySelector('#signupButton');

  signupButton.addEventListener('click', e => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener('click', e => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  // Setting up the default view
  createLoginWindow(csrf);
};

// getToken()
const getToken = () => {
  sendAjax('GET', '/getToken', null, result => {
    setup(result.csrfToken);
  });
};

// When the page has loaded...
$(document).ready(function () {
  getToken();
});
// handleError()
const handleError = msg => {
  /*
  $('#errorMessage').text(msg);
  $('#domoMessage').animate({ width: 'toggle' }, 350);
  */

  window.alert(msg);
};

// redirect()
const redirect = response => {
  $('#domoMessage').animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

// sendAjax()
const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      var msgObj = JSON.parse(xhr.responseText);
      handleError(msgObj.error);
    }
  });
};
