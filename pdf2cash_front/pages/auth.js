export default class Authenticate {

    static makeLogin(token){
        localStorage.setItem('token_initial_time',Date.now());
        localStorage.setItem('token', token);
    }

}