import classNames from 'classnames';
import { memo, useState } from 'react';
import { OfferPreview } from '../../types/offer-preview';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { setFavorite } from '../../store/slices/offers/offers';


type ImageBlock = 'default' | 'offerDetail';

const imageSize: Record<ImageBlock, {width: number; height: number}> = {
  default: {width: 18, height: 19},
  offerDetail: {width: 31, height: 33},
};

type FavoriteButtonProps = {
  id: OfferPreview['id'];
  isFavorite: OfferPreview['isFavorite'];
  size?: ImageBlock;
}

function FavoriteButtonComponent({id, isFavorite, size = 'default'}: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [activeFavorite, setActiveFavorite] = useState(isFavorite);


  const handleBookmarkButtonClick = () => {

    if(authorizationStatus !== AuthorizationStatus.Auth) {
      navigateTo(AppRoutes.Login);
      return;
    }
    dispatch(
      changeFavoriteStatusAction({
        id: id,
        status: Number(!activeFavorite),
      })
    );


    dispatch(setFavorite(id));
    setActiveFavorite((prevFavorite) => !prevFavorite);


  };

  return(
    <button
      className={classNames(
        {'place-card__bookmark-button': size === 'default'},
        {'offer__bookmark-button': size === 'offerDetail'},
        'button',
        {'place-card__bookmark-button--active': activeFavorite && size === 'default'},
        {'offer__bookmark-button--active': activeFavorite && size === 'offerDetail'},
      )}
      type="button"
      onClick={handleBookmarkButtonClick}
    >
      <svg
        className={classNames(
          {'place-card__bookmark-icon': size === 'default'},
          {'offer__bookmark-icon': size === 'offerDetail'},
        )}
        {...imageSize[size]}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

const FavoriteButton = memo(FavoriteButtonComponent);
export default FavoriteButton;
