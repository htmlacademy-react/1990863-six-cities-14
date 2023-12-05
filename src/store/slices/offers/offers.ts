import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/const';
import { City } from '../../../types/city';
import { Sorting } from '../../../types/sorting';
import { fetchOffersAction } from '../../api-actions';
import { OfferPreview } from '../../../types/offer-preview';

type OffersStateType = {
  activeCity: City['name'];
  offers: OfferPreview[];
  isOffersLoading: boolean;
  sotringByItem: Sorting;
  hasErrorOffers: boolean;
}

const initialState: OffersStateType = {
  activeCity: 'Paris',
  offers: [],
  isOffersLoading: false,
  sotringByItem: 'Popular',
  hasErrorOffers: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<City['name']>) => {
      state.activeCity = action.payload;
    },
    setSortingItem: (state, action: PayloadAction<Sorting>) => {
      state.sotringByItem = action.payload;
    },
    setFavorite: (state, action: PayloadAction<OfferPreview['id']>) => {
      const offerChangeFavorite = state.offers.find(({id}) => id === action.payload);
      if(offerChangeFavorite) {
        offerChangeFavorite.isFavorite = !offerChangeFavorite.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasErrorOffers = true;
      });
  },
});

export const { setActiveCity, setSortingItem, setFavorite } = offersSlice.actions;
