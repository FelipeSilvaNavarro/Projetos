const Login = require('../models/loginModel');
exports.index = (req, res) => {
  if (req.session.user) return res.render('login-logado'); // Se tiver req.session.user significa que o user esta logado, então renderiza a outra pagina
  return res.render('login');
};
exports.register = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.register();
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      // Salvando pra retornar pra pag de login
      req.session.save(function () {
        return res.redirect('/login/index'); // Volta pra pagina do login assim que ve um erro
      });
      return;
    }
    req.flash('success', 'Usuario criado com sucesso');
    req.session.save(function () {
      return res.redirect('/login/index');
    });
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};
exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('/login/index');
      });
      return;
    }
    req.flash('success', 'Logado');
    // Jogando o usuario pra dentro da sessão pra salvar as info
    req.session.user = login.user;
    // TODO: Fazer algo pra 3s depois de logado, ele jogar pra tela do index
    req.session.save(function () {
      return res.redirect('/login/index');
    });
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
