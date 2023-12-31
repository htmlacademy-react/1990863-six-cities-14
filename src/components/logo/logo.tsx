import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';
import { memo } from 'react';

function LogoComponent(): JSX.Element {
  return(
    <Link className="header__logo-link header__logo-link--active" to={AppRoutes.Main}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

const Logo = memo(LogoComponent);
export default Logo;
