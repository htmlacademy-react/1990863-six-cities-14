import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import { OfferPreview } from '../../types/offer-preview';
import { capitalize, getRatingWidth, roundRating } from '../../utils/common';
import { BlocksName } from '../../types/blocks';
import classNames from 'classnames';
import { memo, useState } from 'react';
import { getErrorStatus } from '../../store/slices/favorites/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ErrorScreen from '../../pages/error-screen/error-screen';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';

type ImageSize = 'small' | 'large';

type OfferProps = {
  offer: OfferPreview;
  block: BlocksName;
  onCardHover?: (offer: OfferPreview['id'] | null) => void;
  size?: ImageSize;
};

const imageSize: Record<ImageSize, {width: string; height: string}> = {
  small: {width: '150', height: '110'},
  large:{ width: '260', height: '200'},
};

function OfferCardComponent({offer, block, onCardHover, size = 'large'}: OfferProps): JSX.Element {
  const {id, previewImage, title, isFavorite, isPremium, rating, type, price} = offer;

  const [isBookmarkActive, setBookmarkActive] = useState(isFavorite);
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkButtonClick = () => {
    if(authorizationStatus !== AuthorizationStatus.Auth) {
      navigateTo(AppRoutes.Login);
    }

    dispatch(
      changeFavoriteStatusAction({
        id: id,
        status: Number(!isBookmarkActive),
      })
    );
    setBookmarkActive((prevBookmark) => !prevBookmark);
  };

  const handleMouseEnter = () => {
    onCardHover?.(id);
  };
  const handleMouseLeave = () => {
    onCardHover?.(null);
  };

  const hasError = useAppSelector(getErrorStatus);

  // if (hasError) {
  //   return (
  //     <ErrorScreen id={id} isFavorite={isFavorite} />);
  // }

  return(
    <article
      className={classNames(
        'place-card',
        {'near-places__card' : block === 'near',
          [`${block}__card`]: block !== 'near'
        }
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={classNames(
        'place-card__image-wrapper',
        {'near-places__image-wrapper' : block === 'near',
          [`${block}__image-wrapper`]:  block !== 'near'
        }
      )}
      >
        <Link to={`${AppRoutes.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            {...imageSize[size]}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}&nbsp;</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button button',
              {'place-card__bookmark-button--active': isBookmarkActive}
            )}
            type="button"
            onClick={handleBookmarkButtonClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingWidth(roundRating(rating))}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{ capitalize(type)}</p>
      </div>
    </article>

  );
}

const OfferCard = memo(OfferCardComponent);
export default OfferCard;
