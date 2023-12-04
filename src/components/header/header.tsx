import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { memo, useCallback } from 'react';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUser } from '../../store/slices/user/selectors';
import { getFavorites } from '../../store/slices/favorites/selectors';
import SignIn from './user/sign-in';
import Profile from './user/profile';
import SignOut from './user/sign-out';

type HeaderProp = {
  withoutLogin?: boolean;
}

function HeaderComponent({withoutLogin}: HeaderProp): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const favorites = useAppSelector(getFavorites);
  const user = useAppSelector(getUser);

  const handleLogOutClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>

          {withoutLogin ? false : (

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {isLogged
                    ? <Profile favorites={favorites} user={user}/>
                    : <SignIn /> }
                </li>
                {isLogged
                  ? <SignOut onSignOutClick={handleLogOutClick}/>
                  : false }
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

const Header = memo(HeaderComponent);
export default Header;
