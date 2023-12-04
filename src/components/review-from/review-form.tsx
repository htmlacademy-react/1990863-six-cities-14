import { ChangeEvent, FormEvent, Fragment, memo, useState } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, ratingStarsName } from '../../const/const';
import { OfferPreview } from '../../types/offer-preview';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ReviewShortType } from '../../types/review';
import { addNewReviewAction } from '../../store/api-actions';
import { getAddingReviewStatus } from '../../store/slices/reviews/selectors';
type ReviewProps = {
  idOffer: OfferPreview['id'];
}
export function ReviewFormComponent({idOffer}: ReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<ReviewShortType['comment']>('');
  const [rating, setRating] = useState<ReviewShortType['rating'] | null>(null);
  const setIsFormDisabled = useAppSelector(getAddingReviewStatus);
  const isValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating !== null;

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const resetForm = () => {
    setComment('');
    setRating(null);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(idOffer) {
      dispatch(addNewReviewAction([idOffer, {comment, rating: rating as ReviewShortType['rating']}]));
    }
    resetForm();
  };

  return(
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingStarsName)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                checked={score === String(rating)}
                onChange={handleInputChange}
                type="radio"
                disabled={setIsFormDisabled}
              />

              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleTextareaChange}
        disabled={setIsFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least {' '}
          <b className="reviews__text-amount">
            {comment.length && comment.length < MIN_COMMENT_LENGTH ? MIN_COMMENT_LENGTH - comment.length : MIN_COMMENT_LENGTH} characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={setIsFormDisabled || !isValid}
        >
          {setIsFormDisabled ? 'Submit...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

const ReviewForm = memo(ReviewFormComponent);
export default ReviewForm;
