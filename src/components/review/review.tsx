import { memo } from 'react';
import { ReviewType } from '../../types/review';
import { formatDate, getRatingWidth, roundRating } from '../../utils/common';

type ReviewProps = {
  review: ReviewType;
}

export function ReviewComponent({review}: ReviewProps): JSX.Element{
  const {date, comment, rating, user} = review;
  return(
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt={user.name}
          />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingWidth(roundRating(rating))}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date.split('T')[0]}>{formatDate(date)}</time>
      </div>
    </li>
  );
}

const Review = memo(ReviewComponent);
export default Review;
