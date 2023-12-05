import { fakeOffers } from '../../../utils/mocks';
import { fetchNearOffersAction } from '../../api-actions';
import { dropNearOffers, nearOffersSlice } from './near-offers';

describe('NearOffers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      nearOffers: [],
    };

    const result = nearOffersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      nearOffers: [],
    };

    const result = nearOffersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set nearOffers to array with around offers with fetchNearOffersAction.fulfilled', () => {
    const id = fakeOffers[0].id;
    const expectedState = {
      nearOffers: fakeOffers,
    };

    const result = nearOffersSlice.reducer(
      undefined,
      fetchNearOffersAction.fulfilled(
        fakeOffers, '', id)
    );

    expect(result).toEqual(expectedState);
  });

  it('should return an empty array nearOffers with dropNearOffers', () => {
    const initialState = {
      nearOffers: fakeOffers,
    };
    const expectedState = {
      nearOffers: [],
    };

    const result = nearOffersSlice.reducer(
      initialState,
      dropNearOffers
    );

    expect(result).toEqual(expectedState);
  });
});
