import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { APIRoute, NameSpace } from '../const/const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { OfferPreview } from '../types/offer-preview';
import { ReviewShortType, ReviewType } from '../types/review';

type AsyncActionType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};


export const fetchOffersAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  AsyncActionType
>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, { extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Offers);

    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<
  Offer,
  Offer['id'],
  AsyncActionType
>(
  `${NameSpace.Offer}/fetchOffer`,
  async (id, { extra: api }) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);

    return data;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<
  OfferPreview[],
  undefined,
  AsyncActionType
>(
  `${NameSpace.Favorites}/fetchFavorites`,
  async (_arg, { extra: api }) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Favorite);

    return data;
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<
  OfferPreview,
  { id: Offer['id']; status: number },
  AsyncActionType
>(
  `${NameSpace.Favorites}/postFavoriteStatus`,
  async ({ id, status }, { extra: api }) => {
    const { data } = await api.post<OfferPreview>(`${APIRoute.Favorite}/${id}/${status}`);

    return data;
  }
);

export const fetchNearOffersAction = createAsyncThunk<
  OfferPreview[],
  OfferPreview['id'],
  AsyncActionType
>(
  `${NameSpace.NearOffers}/fetchNearby`,
  async (id, { extra: api }) => {
    const {data} = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${id + APIRoute.Nearby}`);

    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<
  ReviewType[],
  Offer['id'],
  AsyncActionType
>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (id, { extra: api }) => {
    const {data} = await api.get<ReviewType[]>(`${APIRoute.Comments}/${id}`);

    return data;
  }
);

export const addNewReviewAction = createAsyncThunk<
  ReviewType,
  [Offer['id'], ReviewShortType],
  AsyncActionType
>(
  `${NameSpace.Reviews}/postReview`,
  async ([id, formData], { extra: api }) => {
    const {data} = await api.post<ReviewType>(`${APIRoute.Comments}/${id}`, formData);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  AsyncActionType
>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    return data;
  },
);

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  AsyncActionType
  >(
    `${NameSpace.User}/login`,
    async ({email, password}, {extra: api}) => {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      const {token} = data;
      saveToken(token);

      return data;
    }
  );

export const logoutAction = createAsyncThunk<void, undefined, AsyncActionType>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
