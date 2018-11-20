export default class Authenticate {
  static makeLogin(token) {
    localStorage.setItem('token_initial_time', Date.now());
    localStorage.setItem('token', token);
  }

  static getToken() {
    if (localStorage.getItem('token') !== null) {
      return localStorage.getItem('token');
    }
    return '';
  }

  static checkLogin() {
    if (localStorage.getItem('token') === null) {
      return false;
    }

    return true;
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static loginValidationdation() {
    if (Authenticate.checkLogin() === true) {
      const time = Date.now() - localStorage.getItem('token_initial_time');
      if (time >= 86400000) {
        Authenticate.logout();
      } else {
        Authenticate.refresh();
      }
      return Authenticate.checkLogin();
    }
    return false;
  }

  static authValidation() {
    const urlVerify = 'http://localhost:8000/api/worker/api-token-verify/';
    fetch(urlVerify, {
      method: 'POST',
      body: JSON.stringify({ token: Authenticate.getToken() }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
    })
      .then((response) => {
        if (!response.ok) {
          this.props.history.push('/');
        }
      })
  }

  static refresh() {
    const urlRefresh = 'http://localhost:8000/api/worker/refresh/';
    fetch(urlRefresh, {
      method: 'POST',
      body: JSON.stringify({ token: Authenticate.getToken() }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
    })

      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })

      .then((token) => {
        this.makeLogin(token.token);
      });
  }
}
