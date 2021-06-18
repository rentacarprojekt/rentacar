import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nProvider, LOCALES } from '../i18n';
import { FormattedMessage, IntlProvider } from 'react-intl';
import './Login.css';


function LoginForm({ Login, error }) {


    const [label, setLabel] = useState({
        label: localStorage.getItem('language') == LOCALES.CROATIAN ? LOCALES.ENGLISH : LOCALES.CROATIAN
    });

    const onButtonClicked = (e) => {

        e.preventDefault();

        if (localStorage.getItem('language') == LOCALES.CROATIAN) {

            localStorage.setItem('language', LOCALES.ENGLISH);
            setLabel({ label: LOCALES.CROATIAN });



        } else {

            localStorage.setItem('language', LOCALES.CROATIAN);
            setLabel({ label: LOCALES.ENGLISH });


        }

    }


    const [details, setDetails] = useState({ userName: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }


    return (
        <I18nProvider locale={localStorage.getItem('language')}>
            <form onSubmit={submitHandler}  >
                <button onClick={onButtonClicked} className="lbtn lang">{label.label}</button>
                <div className="login-form">
                    <div className="logo"></div>
                    <h2 className="login" ><FormattedMessage id="login" /></h2>
                    {(error != "") ? (<div className="error"><FormattedMessage classname="error" id="details_mismatch" /></div>) : ""}
                    <div className="form-group">
                        <FormattedMessage id="username">
                            {placeholder =>
                                <input type="text" name="name" id="id"
                                    onChange={e => setDetails({ ...details, userName: e.target.value })}
                                    className="form-control item"
                                    placeholder={placeholder} />
                            }
                        </FormattedMessage>
                    </div>
                    <div className="form-group">
                        <FormattedMessage id="password">
                            {placeholder =>
                                <input type="password" name="password" id="password"
                                    onChange={e => setDetails({ ...details, password: e.target.value })}
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

export default LoginForm;
