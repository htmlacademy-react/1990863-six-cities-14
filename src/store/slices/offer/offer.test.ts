import { fakeOffer, fakeOffers } from '../../../utils/mocks';
import { fetchOfferAction } from '../../api-actions';
import { dropOffer, offerSlice } from './offer';

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      isOfferLoading: false,
    };

    const result = offerSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      isOfferLoading: false,
    };

    const result = offerSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set offer with fetchOfferAction.fulfilled, isOfferLoading to false', () => {
    const id = fakeOffers[0].id;
    const expectedState = {
      offer: fakeOffer,
      isOfferLoading: false,
    };

    const result = offerSlice.reducer(
      undefined,
      fetchOfferAction.fulfilled(
        fakeOffer, '', id)
    );

    expect(result).toEqual(expectedState);
  });

  it('should isOfferLoading to true with fetchOfferAction.pending', () => {
    const expectedState = {
      offer: null,
      isOfferLoading: true,
    };

    const result = offerSlice.reducer(
      undefined,
      fetchOfferAction.pending
    );

    expect(result).toEqual(expectedState);
  });

  it('should isOfferLoading to false with fetchOfferAction.rejected', () => {
    const expectedState = {
      offer: null,
      isOfferLoading: false,
    };

    const result = offerSlice.reducer(
      undefined,
      fetchOfferAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should return offer null with dropOffer', () => {
    const initialState = {
      offer: fakeOffer,
      isOfferLoading: false,
    };
    const expectedState = {
      offer: null,
      isOfferLoading: false,
    };

    const result = offerSlice.reducer(
      initialState,
      dropOffer
    );

    expect(result).toEqual(expectedState);
  });
});
