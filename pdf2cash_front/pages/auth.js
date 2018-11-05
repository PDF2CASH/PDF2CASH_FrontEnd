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
}