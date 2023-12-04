import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoutes, CityName } from '../../const/const';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../../components/login-form/login-form';

function LoginScreenComponent(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const randomCity = CityName[Math.floor(Math.random() * CityName.length)];

  return (
    <div className="page page--gray page--login">
      {isLogged ?
        <Navigate to={AppRoutes.Main} /> :
        (
          <React.Fragment>
            <Helmet>
              <title>6 cities: authorization</title>
            </Helmet>

            <ToastContainer />

            <Header withoutLogin/>

            <main className="page__main page__main--login">
              <div className="page__login-container container">
                <section className="login">
                  <h1 className="login__title">Sign in</h1>
                  <LoginForm />
                </section>
                <section className="locations locations--login locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={`${AppRoutes.Main}?city=${randomCity}`}>
                      <span>{randomCity}</span>
                    </Link>
                  </div>
                </section>
              </div>
            </main>
          </React.Fragment>
        )}
    </div>
  );
}

const LoginScreen = memo(LoginScreenComponent);
export default LoginScreen;
