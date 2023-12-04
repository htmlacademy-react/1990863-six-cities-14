import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { reviewsSelector } from '../../store/selectors';
import { getReviews } from '../../store/slices/reviews/selectors';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import { OfferPreview } from '../../types/offer-preview';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';
import ReviewForm from '../review-from/review-form';
import Review from '../review/review';


type ReviewListProps = {
  idOffer: OfferPreview['id'];
}

export function ReviewsListComponent({idOffer}: ReviewListProps): JSX.Element{
  const reviews = useAppSelector(getReviews);
  const reviewsToRender = reviewsSelector(reviews);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviewsToRender.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </ul>
      {isLogged && <ReviewForm idOffer={idOffer}/>}
    </section>
  );
}

const ReviewsList = memo(ReviewsListComponent);
export default ReviewsList;
