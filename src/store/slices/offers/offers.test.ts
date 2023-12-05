import { CityName } from '../../../const/const';
import { City } from '../../../types/city';
import { Sorting } from '../../../types/sorting';
import { fakeOffers } from '../../../utils/mocks';
import { fetchOffersAction } from '../../api-actions';
import { offersSlice, setActiveCity, setFavorite, setSortingItem } from './offers';

describe('Offers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeCity: 'Amsterdam' as City['name'],
      offers: [],
      isOffersLoading: false,
      sotringByItem: 'HighToLow' as Sorting,
      hasErrorOffers: false,
    };

    const result = offersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeCity: 'Paris' as City['name'],
      offers: [],
      isOffersLoading: false,
      sotringByItem: 'Popular' as Sorting,
      hasErrorOffers: false,
    };

    const result = offersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set sotringByItem with setSortingItem action', () => {
    const initialState = {
      activeCity: 'Paris' as City['name'],
      offers: [],
      isOffersLoading: false,
      sotringByItem: 'Popular' as Sorting,
      hasErrorOffers: false,
    };

    const expectedSortingByItem: Sorting = 'LowToHigh';
    const result = offersSlice.reducer(initialState, setSortingItem(expectedSortingByItem));
    expect(result.sotringByItem).toBe(expectedSortingByItem);

  });

  it('should set activeCity with setActiveCity action', () => {
    const initialState = {
      activeCity: 'Cologne' as City['name'],
      offers: [],
      isOffersLoading: false,
      sotringByItem: 'Popular' as Sorting,
      hasErrorOffers: false,
    };

    const expectedActiveCity: City['name'] = CityName['3'];
    const result = offersSlice.reducer(initialState, setActiveCity(expectedActiveCity));
    expect(result.activeCity).toBe(expectedActiveCity);
  });

  it('should set isOffersLoading to true, hasErrorOffers to false with fetchOffersAction.pending', () => {
    const expectedState = {
      activeCity: 'Paris' as City['name'],
      offers: [],
      isOffersLoading: true,
      sotringByItem: 'Popular' as Sorting,
      hasErrorOffers: false,
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set offers to array with offers, isOffersLoading to false with fetchOffersAction.fulfilled', () => {
    const expectedState = {
      activeCity: 'Paris' as City['name'],
      offers: fakeOffers,
      isOffersLoading: false,
      sotringByItem: 'Popular' as Sorting,
      hasErrorOffers: false,
    };

    const result = offersSlice.reducer(
      undefined,
      fetchOffersAction.fulfilled(
        fakeOffers, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set isOffersLoading to false, hasErrorOffers to true with fetchOffersAction.rejected', () => {
    const expectedState = {
      activeCity: 'Paris' as City['name'],
      offers: [],
      isOffersLoading: false,
      sotringByItem: 'Popular' as Sorting,
      hasErrorOffers: true,
    };

    const result = offersSlice.reducer(
      undefined,
      fetchOffersAction.rejected
    );
    expect(result).toEqual(expectedState);
  });

  it('should set favorites with setFavorite action after change isFavorite', () => {
    const mockOffer = fakeOffers[0];
    const initialState = {
      activeCity: 'Paris' as City['name'],
      offers: [mockOffer, fakeOffers[1]],
      isOffersLoading: false,
      sotringByItem: 'Popular' as Sorting,
      hasErrorOffers: false,
    };
    const expectedState = {
      activeCity: 'Paris' as City['name'],
      offers: [{...mockOffer, isFavorite: !mockOffer.isFavorite}, fakeOffers[1]],
      isOffersLoading: false,
      sotringByItem: 'Popular' as Sorting,
      hasErrorOffers: false,
    };

    const result = offersSlice.reducer(initialState, setFavorite(mockOffer.id));
    expect(result).toEqual(expectedState);
  });
});
