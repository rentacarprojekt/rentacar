import React, { useState, useEffect, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nProvider, LOCALES } from '../i18n';
import { FormattedMessage, IntlProvider } from 'react-intl';
import './Login.css';
import UserService from '../axios/UserService';


class LoginForm extends Component {

    constructor(props){
        super(props)
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

    submitHandler = e => {
        e.preventDefault();
        //Login(details);
        const form = e.currentTarget;
        let user = {username: form.name.value, password: form.password.value}
        UserService.login(user).then(res =>{
            localStorage.setItem('Authorization', res.data.token)
            this.props.history.push('/')
        })
    }

    render(){
        return (
            <I18nProvider locale={localStorage.getItem('language')}>
                <form onSubmit={this.submitHandler}  >
                    <button onClick={this.onButtonClicked} className="lbtn lang">{this.state.label}</button>
                    <div className="login-form">
                        <div className="logo"></div>
                        <h2 className="login" ><FormattedMessage id="login" /></h2>
                        {(this.state.error != "") ? (<div className="error"><FormattedMessage classname="error" id="details_mismatch" /></div>) : ""}
                        <div className="form-group">
                            <FormattedMessage id="username">
                                {placeholder =>
                                    <input type="text" name="name" id="id"
                                        className="form-control item"
                                        placeholder={placeholder} />
                                }
                            </FormattedMessage>
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="password">
                                {placeholder =>
                                    <input type="password" name="password" id="password"
                                        className="form-control item"
                                        placeholder={placeholder} />
                                }
                            </FormattedMessage>
                        </div>
                        <FormattedMessage id="login">
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

export default LoginForm;
