export default class Authenticate {

    static makeLogin(token){
        localStorage.setItem('token_initial_time',Date.now());
        localStorage.setItem('token', token);
    }

    static getToken(){
        if(localStorage.getItem('token') !== null){
          return localStorage.getItem('token');
        }else{
          return '';
        }
    }

    static checkLogin(){
        if (localStorage.getItem('token') === null) {
          return false;
        }
        else{
          return true;
        }
    }

    static logout(){
        localStorage.removeItem('token');
    }

    static login_validation(){
        if(Authenticate.checkLogin() === true){
            var time = Date.now() - localStorage.getItem('token_initial_time');
            if(time >= 86400000){
                Authenticate.logout();
            }else{
                Authenticate.refresh();
            }
            return Authenticate.checkLogin();
        }else{
            return false;
        }
    }
    
}