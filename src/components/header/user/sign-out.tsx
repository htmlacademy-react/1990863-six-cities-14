import { memo } from 'react';
import { Link } from 'react-router-dom';

type SignOutProps = {
  onSignOutClick: () => void;
}

function SignOutComponent({onSignOutClick}: SignOutProps): JSX.Element {
  return(
    <li className="header__nav-item">
      <Link
        className="header__nav-link"
        to={''}
        onClick={onSignOutClick}
      >
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}

const SignOut = memo(SignOutComponent);
export default SignOut;
