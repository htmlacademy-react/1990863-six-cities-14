import { createSlice } from '@reduxjs/toolkit';
import { ReviewType } from '../../../types/review';
import { addNewReviewAction, fetchReviewsAction } from '../../api-actions';
import { NameSpace } from '../../../const/const';

type ReviewsStateType = {
  reviews: ReviewType[];
  isAddingReview: boolean;
  isAddingError: boolean;
  isAddingSeccess: boolean;
}

const initialState: ReviewsStateType = {
  reviews: [],
  isAddingReview: false,
  isAddingError: false,
  isAddingSeccess: false,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    dropReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addNewReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isAddingReview = false;
        state.isAddingSeccess = true;
      })
      .addCase(addNewReviewAction.pending, (state) => {
        state.isAddingReview = true;
      })
      .addCase(addNewReviewAction.rejected, (state) => {
        state.isAddingError = true;
      });
  },
});

export const { dropReviews } = reviewsSlice.actions;
