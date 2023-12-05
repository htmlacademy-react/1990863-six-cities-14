import { fakeOffers } from '../../../utils/mocks';
import { changeFavoriteStatusAction, fetchFavoriteOffersAction } from '../../api-actions';
import { favoritesSlice } from './favorites';

describe('Favorites Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: [],
    };
    const result = favoritesSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { favorites: [] };

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set favorites to array with favorites offers with fetchFavoriteOffersAction.fulfilled', () => {
    const expectedState = {
      favorites: fakeOffers
    };

    const result = favoritesSlice.reducer(
      undefined,
      fetchFavoriteOffersAction.fulfilled(
        fakeOffers, '', undefined
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should set favorites are updated after changeFavoriteStatusAction.fulfilled', () => {
    const initialFavoriteOffer = {...fakeOffers[2], isFavorite: true};
    const initialState = {
      favorites: [initialFavoriteOffer]
    };
    const toAddFavoriteOffer = {...fakeOffers[3], isFavorite: true};
    const expectedState = {
      favorites: [initialFavoriteOffer, toAddFavoriteOffer]
    };

    const result = favoritesSlice.reducer(
      initialState,
      changeFavoriteStatusAction.fulfilled(toAddFavoriteOffer, '', { id: toAddFavoriteOffer.id, status: Number(toAddFavoriteOffer.isFavorite) })
    );

    expect(result).toEqual(expectedState);
  });

  it('should delete favorites are updated after changeFavoriteStatusAction.fulfilled', () => {
    const initialFavoriteOffer = {...fakeOffers[2], isFavorite: false};
    const initialState = {
      favorites: [{...initialFavoriteOffer, isFavorite: true}]
    };
    const expectedState = {
      favorites: []
    };

    const result = favoritesSlice.reducer(
      initialState,
      changeFavoriteStatusAction.fulfilled(initialFavoriteOffer, '', { id: initialFavoriteOffer.id, status: Number(initialFavoriteOffer.isFavorite) })
    );

    expect(result).toEqual(expectedState);


  });
});
