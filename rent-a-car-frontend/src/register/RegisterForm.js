import React, { useState } from 'react';

import '../login/Login.css';
import { I18nProvider, LOCALES } from '../i18n';
import { FormattedMessage, IntlProvider } from 'react-intl';

function RegisterForm({ Login, Register, error }) {


    const [locale, setLocale] = useState({
        label: localStorage.getItem('language') == LOCALES.CROATIAN ? LOCALES.ENGLISH : LOCALES.CROATIAN
    });

    const onButtonClicked = (e) => {

        e.preventDefault();

        if (localStorage.getItem('language') == LOCALES.CROATIAN) {

            localStorage.setItem('language', LOCALES.ENGLISH);
            setLocale({ label: LOCALES.CROATIAN });

        } else {

            localStorage.setItem('language', LOCALES.CROATIAN);
            setLocale({ label: LOCALES.ENGLISH });

        }

    }


    const [details, setDetails] = useState({
        firstName: "", lastName: "", address: "",
        userName: "", email: "", phone: "", password: ""
    });



    const submitHandler = e => {
        e.preventDefault();
        Register(details);
    }



    return (

        <I18nProvider locale={localStorage.getItem('language')}>
            <form onSubmit={submitHandler} className="logRegForm"  >
                <button onClick={onButtonClicked} className="lbtn lang buttonLogReg">{locale.label}</button>
                <div className="register-form">
                    <div className="registerLogo"></div>
                    <h2 className="login"><FormattedMessage id="register" /></h2>
                    {(error != null) ? (<div className="error">{error}</div>) : ("")}
                    <div className="form-group">
                        <FormattedMessage id="first_name" >
                            {placeholder =>
                                <input type="text" id="firstName"
                                    onChange={e => setDetails({ ...details, firstName: e.target.value })} value={details.firstName}
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
                                <input type="text" id="lastName"
                                    onChange={e => setDetails({ ...details, lastName: e.target.value })} value={details.lastName}
                                    className="form-control item"
                                    placeholder={placeholder} />
                            }
                        </FormattedMessage>

                    </div>
                    {/*                     <div className="form-group">
                        <FormattedMessage id="address" >
                            {placeholder =>
                                <input type="text" id="address"
                                    onChange={e => setDetails({ ...details, address: e.target.value })} value={details.address}
                                    className="form-control item"
                                    placeholder={placeholder} />
                            }
                        </FormattedMessage>
                    </div> */}
                    <div className="form-group">
                        <FormattedMessage id="username" >
                            {placeholder =>
                                <input type="text" id="userName"
                                    onChange={e => setDetails({ ...details, userName: e.target.value })} value={details.userName}
                                    className="form-control item"
                                    placeholder={placeholder} />
                            }
                        </FormattedMessage>
                    </div>
                    <div className="form-group">
                        <FormattedMessage id="email">
                            {placeholder =>
                                <input type="email" id="email"
                                    onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email}
                                    className="form-control item"
                                    placeholder={placeholder} />
                            }

                        </FormattedMessage>
                    </div>
                    {/*                     <div className="form-group">
                        <FormattedMessage id="phone">
                            {placeholder =>
                                <input type="tel" id="phone"
                                    onChange={e => setDetails({ ...details, phone: e.target.value })} value={details.phone}
                                    className="form-control item"
                                    placeholder={placeholder} />
                            }
                        </FormattedMessage>
                    </div> */}
                    <div className="form-group">
                        <FormattedMessage id="password">
                            {placeholder =>
                                <input type="password" id="password"
                                    onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}
                                    className="form-control item"
                                    placeholder={placeholder} />
                            }
                        </FormattedMessage>
                    </div>
                    <div className="form-group">
                        <FormattedMessage id="register">
                            {placeholder =>

                                <input type="submit" value={placeholder} className="lbtn" />
                            }
                        </FormattedMessage>
                    </div>

                </div>
            </form>

        </I18nProvider>

    )
}


export default RegisterForm;