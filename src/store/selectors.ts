import { createSelector } from '@reduxjs/toolkit';
import { ReviewType } from '../types/review';
import { MAX_COMMENT_COUNT, NameSpace } from '../const/const';
import { State } from '../types/state';
import { OfferPreview } from '../types/offer-preview';

const getFavoritesItems = (state: State) => state[NameSpace.Favorites].favorites;

export const favoriteOffersSortSelector = createSelector(getFavoritesItems, (items) =>
  [...items].sort((a, b) => (a.city.name > b.city.name ? 1 : -1))
);

const getSortingItem = (state: State) => state[NameSpace.Offers].sotringByItem;

export const getSortedOffers = createSelector(
  [
    getSortingItem,
    (_: State, offers: OfferPreview[]) => offers
  ],
  (sortingItem, offers) => {
    switch (sortingItem) {
      case 'Popular':
        return offers;
      case 'HighToLow':
        return offers.slice().sort((a, b) => b.price - a.price);
      case 'LowToHigh':
        return offers.slice().sort((a, b) => a.price - b.price);
      case 'TopRated':
        return offers.slice().sort((a, b) => b.rating - a.rating);
    }
  }
);

const getReviews = (reviews: ReviewType[]) => reviews;

export const reviewsSelector = createSelector(
  getReviews, (reviews) =>
    reviews.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_COMMENT_COUNT)
);
