import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getReviews = (state: State) => state[NameSpace.Reviews].reviews;

export const getAddingReviewStatus = (state: State) => state[NameSpace.Reviews].isAddingReview;

export const getAddingErrorStatus = (state: State) => state[NameSpace.Reviews].isAddingError;

export const getAddingSeccessStatus = (state: State) => state[NameSpace.Reviews].isAddingSeccess;
