import React, { memo } from 'react';
import { Offer } from '../../types/offer';
import { ImagesContainer } from './offer-images-container';
import { capitalize, getRatingWidth, insertPlural, roundRating } from '../../utils/common';
import ReviewsList from '../reviews-list/reviews-list';
import FavoriteButton from '../favorite-button/favorite-button';

type OfferDetailsProps = {
  offer: Offer;
}
export function OfferDetailsComponent({offer}: OfferDetailsProps): JSX.Element {

  const {
    id,
    title,
    isFavorite,
    isPremium,
    rating,
    type,
    price,
    goods,
    bedrooms,
    description,
    host,
    images,
    maxAdults
  } = offer;

  const {isPro, avatarUrl, name: hostName} = host;

  const splitedDescription = description.split('. ');

  return(
    <React.Fragment>
      <ImagesContainer images={images}/>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {title}
            </h1>
            <FavoriteButton id={id} isFavorite={isFavorite} size='offerDetail' />
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{width: getRatingWidth(roundRating(rating))}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {capitalize(type)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {bedrooms} Bedroom{insertPlural(bedrooms)}
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {maxAdults} adult{insertPlural(maxAdults)}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goods.map((good) => (
                <li key={good} className="offer__inside-item">
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className={`offer__avatar-wrapper user__avatar-wrapper ${isPro && 'offer__avatar-wrapper--pro'}`}>
                <img className="offer__avatar user__avatar" src={avatarUrl} width={74} height={74} alt="Host avatar"/>
              </div>
              <span className="offer__user-name">
                {hostName}
              </span>
              {isPro && <span className="offer__user-status">Pro</span>}
            </div>
            <div className="offer__description">
              {splitedDescription.map((paragraph, index) => (
                <p key={paragraph} className="offer__text">
                  {paragraph}
                  {index < splitedDescription.length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>
          <ReviewsList idOffer={id}/>
        </div>
      </div>
    </React.Fragment>
  );
}

const OfferDetails = memo(OfferDetailsComponent);
export default OfferDetails;
