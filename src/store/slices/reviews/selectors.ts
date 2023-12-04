import { NameSpace } from '../../../const/const';
import { State } from '../../../types/state';

export const getReviews = (state: State) => state[NameSpace.Reviews].reviews;

export const getAddingReviewStatus = (state: State) => state[NameSpace.Reviews].isAddingReview;
