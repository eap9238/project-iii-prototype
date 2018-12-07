const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'RAWR! All fields are required!' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.inputPassword}`;
  req.body.pass2 = `${req.body.inputPassword2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'RAWR! All fields are required!' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'RAWR! Passwords do not match!' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occured' });
    });
  });
};

const changeup = (request, response) => {
  const req = request;
  const res = response;

  req.body.oldPass = `${req.body.oldPass}`;
  req.body.inputPassword = `${req.body.inputPassword}`;
  req.body.inputPassword2 = `${req.body.inputPassword2}`;

  if (!req.body.oldPass || !req.body.inputPassword || !req.body.inputPassword2) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  if (req.body.inputPassword !== req.body.inputPassword2) {
    return res.status(400).json({ error: 'New passwords do not match!' });
  }

  console.dir(req.body.oldPass);
  console.dir(req.body.inputPassword);

  console.dir(req.session.account.password);
    
    Account.AccountModel.generateHash(req.body.oldPass, (salt, hash) => {
        const accountData = {
            salt,
            password: hash,
        };
        
        console.dir(hash);
        console.dir(salt);
        
        console.dir(req.session.account.username);
        console.dir(req.session.account.password);
        
        console.dir(accountData.password);
        
        Account.AccountModel.authenticate(req.session.account.username, accountData.password, (err, account) => {
            if (err || !account) {
                return res.status(401).json({ error: 'Wrong username or password' });
            }

            //req.session.account = Account.AccountModel.toAPI(account);
            console.dir("Go go power Rangers!");

            return res.json({ redirect: '/maker' });
        });
    });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.changePassword = changeup;
module.exports.signup = signup;
module.exports.getToken = getToken;
