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

    static authValidation(){
        const urlVerify = 'http://localhost:8000/api/worker/api-token-verify/';
        fetch(urlVerify,{
            method: 'POST',
            body: JSON.stringify({token:Authenticate.getToken()}),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'omit'
        })

        .then(function(response){
            if(!response.ok){
                this.props.history.push("/");
            }
        }.bind(this))
    }

    static refresh(){
        const urlRefresh = 'http://localhost:8000/api/worker/refresh/';
        fetch(urlRefresh,{
            method: 'POST',
            body: JSON.stringify({token:Authenticate.getToken()}),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'omit'
        })
        
        .then(function(response){
            if(response.ok){
                return response.json();
            }
        })
            
        .then(function(token){
            this.makeLogin(token.token);
        }.bind(this));
    }
}

