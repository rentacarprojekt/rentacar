import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nProvider, LOCALES } from '../i18n';
import { FormattedMessage} from 'react-intl';
import '../login/Login.css';
import UserService from '../axios/UserService';
import { Alert } from "react-bootstrap";

class RegisterForm extends Component{

    constructor(params){
        super(params)
        this.state = {
            label: localStorage.getItem('language'),
            error: ''
        }
    }

    onButtonClicked = (e) => {

        e.preventDefault();

        if (localStorage.getItem('language') == LOCALES.CROATIAN) {

            localStorage.setItem('language', LOCALES.ENGLISH);
            this.setState({ label: LOCALES.CROATIAN });



        } else {

            localStorage.setItem('language', LOCALES.CROATIAN);
            this.setState({ label: LOCALES.ENGLISH });


        }

    }

    componentDidMount() {
        if(localStorage.getItem('Authorization')!=null)
            this.props.history.push('/')
    }

    submitHandler = e => {
        e.preventDefault();
        const form = e.currentTarget;
        let user = {firstName: form.firstName.value, lastName: form.lastName.value, username: form.username.value, password: form.password.value, email: form.email.value}
        UserService.register(user)
        .then(res =>{
                this.props.history.push('/login')
        })
        .catch(err =>{
            this.setState({error: "error"})
        })
    }

    render(){
        return(
            <I18nProvider locale={localStorage.getItem('language')}>
                <form onSubmit={this.submitHandler} className="logRegForm" >
                    <button onClick={this.onButtonClicked} className="lbtn lang buttonLogReg">{this.state.label}</button>
                    <div className="register-form">
                        <div className="registerLogo"></div>
                        <h2 className="login" ><FormattedMessage id="register" /></h2>
                        <Alert variant="danger" hidden={this.state.error==''}>
                            <p>
                            <FormattedMessage classname="error" id="details_mismatch" />
                            </p>
                        </Alert>
                        <div className="form-group">
                            <FormattedMessage id="first_name" >
                                {placeholder =>
                                    <input type="text" id="firstName" name="firstName"
                                        className="form-control item"
                                        placeholder={placeholder}
                                        required="true"
                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="last_name" >
                                {placeholder =>
                                    <input type="text" id="lastName" name="lastName"
                                        className="form-control item"
                                        placeholder={placeholder}
                                        required="true"
                                    />
                                }
                            </FormattedMessage>

                        </div>
                        <div className="form-group">
                            <FormattedMessage id="username">
                                {placeholder =>
                                    <input type="text" name="username" id="username"
                                        className="form-control item"
                                        placeholder={placeholder} 
                                        required="true"
                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="password">
                                {placeholder =>
                                    <input type="password" name="password" id="password"
                                        className="form-control item"
                                        placeholder={placeholder}                                        
                                        required="true"
                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="email">
                                {placeholder =>
                                    <input type="email" name="email" id="email"
                                        className="form-control item"
                                        placeholder={placeholder} 
                                        required="true"
                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <FormattedMessage id="register">
                            {placeholder =>
                                <input type="submit" value={placeholder} className="lbtn" />
                            }
                        </FormattedMessage>

                    </div>
                </form>
            </I18nProvider>
        )
    }

}

export default RegisterForm;