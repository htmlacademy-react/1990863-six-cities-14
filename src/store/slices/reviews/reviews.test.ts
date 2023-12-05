import { ReviewShortType } from '../../../types/review';
import { fakeOffers, fakeReviews } from '../../../utils/mocks';
import { addNewReviewAction, fetchReviewsAction } from '../../api-actions';
import { reviewsSlice } from './reviews';

describe('Reviews Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isAddingReview: false
    };

    const result = reviewsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isAddingReview: false
    };

    const result = reviewsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set reviews to array with reviews by offer with fetchReviewsAction.fulfilled', () => {
    const id = fakeOffers[0].id;
    const expectedState = {
      reviews: fakeReviews,
      isAddingReview: false
    };

    const result = reviewsSlice.reducer(
      undefined,
      fetchReviewsAction.fulfilled(
        fakeReviews, '', id)
    );
    expect(result).toEqual(expectedState);
  });

  it('should add review to array with addNewReviewAction.fulfilled', () => {
    const review = fakeReviews[0];
    const id = fakeOffers[0].id;
    const expectedState = {
      reviews: [review],
      isAddingReview: false
    };

    const result = reviewsSlice.reducer(
      undefined,
      addNewReviewAction.fulfilled(review, '' , [id, review as ReviewShortType])
    );
    expect(result).toEqual(expectedState);
  });

  it('should return status true  with addNewReviewAction.pending', () => {
    const expectedState = {
      reviews: [],
      isAddingReview: true
    };
    const result = reviewsSlice.reducer(
      undefined,
      addNewReviewAction.pending
    );
    expect(result).toEqual(expectedState);
  });
});
