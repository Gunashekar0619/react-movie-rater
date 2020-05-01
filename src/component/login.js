import React,{ Component } from 'react';
import { withCookies } from 'react-cookie';

class Login extends Component {

    state = {
        credentials :{
            username:"",
            password:""
        },
        isLoginview : true,
        login : 0
    }

    inputchanged = event =>{
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }
    login = event =>{        
        if(this.state.isLoginview) {
            fetch(`${process.env.REACT_APP_URL}/auth/`,{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(this.state.credentials)        
            }).then(resp => resp.json())
            .then(res => {
                console.log(res.token);
                this.props.cookies.set('mr-token',res.token);
                this.setState({login : 1});
                this.loginfun();
            })
            .catch(                
                err =>{
                console.log(err);
                this.setState({login : 0});
                this.loginfun();
                }
            )
        } else {
            console.log("simple change");
            fetch(`${process.env.REACT_APP_URL}/api/user/`,{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(this.state.credentials)        
            }).then(resp => resp.json())
            .then(res => {
                this.setState({isLoginview: true});
            })
            .catch(error => console.log(error))
        }
        
    }

    logerror = (error) =>{
        alert(error)
    }
    loginfun = () =>{
        if(this.state.login === 1)
        window.location.href="/movies";
        else
        window.location.href="/";
    }
    toggleView = () => {
        this.setState({isLoginview: !this.state.isLoginview});
    }

    render(){
        return <div className ="login_container">
            <h1>
                {this.state.isLoginview ? 'Login' :'register'}
                </h1><br/>
            <span>Username</span><br/>
            <input name = "username" type = "text" value ={this.state.credentials.username}  onChange={this.inputchanged}/><br/>
            <span>Password</span><br/>
            <input name = "password" type = "text" value ={this.state.credentials.password} onChange={this.inputchanged}/><br/>
            <button onClick={this.login} >
                {this.state.isLoginview ? 'Login' : 'Register'}
            </button>
            <p onClick={this.toggleView}>
                {this.state.isLoginview ? 'create account' : 'back to login'}
            </p>
        </div>
    }
}

export default withCookies(Login);