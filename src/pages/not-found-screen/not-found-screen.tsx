import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoutes } from '../../const/const';
import { Helmet } from 'react-helmet-async';
import './style.css';
import { memo } from 'react';

function NotFoundScreenComponent(): JSX.Element {
  return(
    <div className='page--gray container container-404'>
      <Helmet>
        <title>Can not found: 404</title>
      </Helmet>
      <Logo/>

      <section className="game__screen">
        <h1 className='header-404'>404. Page not found</h1>
        <hr />
        <br/>
        <Link className="a-404" to={AppRoutes.Main}>Вернуться на главную</Link>
      </section>
    </div>
  );
}

const NotFoundScreen = memo(NotFoundScreenComponent);
export default NotFoundScreen;
