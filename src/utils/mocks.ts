import { Action } from '@reduxjs/toolkit';
import { Location } from '../types/location';
import { OfferPreview } from '../types/offer-preview';
import { datatype } from 'faker';
import { ReviewType } from '../types/review';
import { Offer } from '../types/offer';

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeLocation = (): Location => ({
  latitude: datatype.number({ min: -90, max: 90, precision: 0.000001 }),
  longitude: datatype.number({ min: -180, max: 180, precision: 0.000001 }),
  zoom: datatype.number({ min: 1, max: 17 }),
} as Location);

export const fakeOffers: OfferPreview[] = [
  {
    id: '8bbd8b29-b582-48b8-a2f2-ef815e860a97',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 137,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/20.jpg',
    city: {
      name: 'Paris',
      location: makeFakeLocation()
    },
    location:  makeFakeLocation(),
    isFavorite: false,
    isPremium: false,
    rating: 3
  },
  {
    id: 'be96879e-c942-4a87-acd4-47ab287e0ab6',
    title: 'Waterfront with extraordinary view',
    type: 'hotel',
    price: 177,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
    city: {
      name: 'Paris',
      location: makeFakeLocation()
    },
    location: makeFakeLocation(),
    isFavorite: false,
    isPremium: false,
    rating: 1.6
  },
  {
    id: 'dee231b0-0220-4049-925c-356372747a2e',
    title: 'Amazing and Extremely Central Flat',
    type: 'hotel',
    price: 307,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
    city: {
      name: 'Paris',
      location: makeFakeLocation()
    },
    location: makeFakeLocation(),
    isFavorite: false,
    isPremium: true,
    rating: 1.3
  },
  {
    id: '015bb170-f244-4c51-b69a-e14981e71179',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'hotel',
    price: 344,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
    city: {
      name: 'Paris',
      location: makeFakeLocation()
    },
    location: makeFakeLocation(),
    isFavorite: false,
    isPremium: false,
    rating: 1
  },
  {
    id: '926838e5-459a-4878-88da-23cdfd0817f4',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'hotel',
    price: 250,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/6.jpg',
    city: {
      name: 'Paris',
      location: makeFakeLocation()
    },
    location: makeFakeLocation(),
    isFavorite: false,
    isPremium: true,
    rating: 2.3
  },
];

export const fakeReviews: ReviewType[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-sdf345dm7j82n',
    date: '2019-05-09T14:13:56.569Z',
    user: {
      name: 'Qwerty Qwerty',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-10T14:13:56.569Z',
    user: {
      name: 'Test Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
];

export const fakeOffer: Offer = {
  'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }},
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': false,
  'isPremium': false,
  'rating': 4,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'bedrooms': 3,
  'goods': [
    'Heating'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': 'https://url-to-image/image.png',
    'isPro': false
  },
  'images': [
    'https://url-to-image/image.png'
  ],
  'maxAdults': 4,
  previewImage: ''
};
