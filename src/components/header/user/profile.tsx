import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const/const';
import { UserData } from '../../../types/user-data';
import { OfferPreview } from '../../../types/offer-preview';
import { memo } from 'react';

type ProfileProops = {
  favorites: OfferPreview[];
  user: UserData | null;
}

function ProfileComponent({user, favorites}: ProfileProops): JSX.Element {
  return(
    <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
      <div
        className="header__avatar-wrapper user__avatar-wrapper"
        style={{backgroundImage: `url("${user?.avatarUrl}")` }}
      >
      </div>
      <span className="header__user-name user__name">
        {user?.email}
      </span>
      <span className="header__favorite-count">
        {favorites.length}
      </span>
    </Link>
  );
}

const Profile = memo(ProfileComponent);
export default Profile;
