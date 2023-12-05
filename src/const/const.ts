const COUNT_OFFER_IMAGES = 6;

const MAX_COMMENT_LENGTH = 300;
const MIN_COMMENT_LENGTH = 50;

const MAX_COMMENT_COUNT = 10;
const MAX_NEAR_PLACES_COUNT = 3;

const ratingStarsName = {
  '1': 'terribly',
  '2': 'badly',
  '3': 'not bad',
  '4': 'good',
  '5': 'perfect'
};

enum AppRoutes {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const CityName = ['Paris','Cologne','Brussels','Amsterdam','Hamburg','Dusseldorf'] as const;

const SortingMap = {
  Popular: 'Popular',
  LowToHigh: 'Price: low to high',
  HighToLow: 'Price: high to low',
  TopRated: 'Top rated first'
} as const;


enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby'
}

enum NameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Favorites = 'FAVORITES',
  Reviews = 'REVIEWS',
  User = 'USER',
  NearOffers = 'NEAR_OFFERS'
}

export {
  COUNT_OFFER_IMAGES,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_COUNT,
  MAX_NEAR_PLACES_COUNT,
  ratingStarsName,
  AppRoutes,
  AuthorizationStatus,
  CityName,
  SortingMap,
  APIRoute,
  NameSpace
};
