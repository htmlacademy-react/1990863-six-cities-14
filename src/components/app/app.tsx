import { Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/slices/user/selectors';
import { getOffersLoadingStatus } from '../../store/slices/offers/selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    dispatch(fetchOffersAction());
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [authorizationStatus, dispatch]);

  if (!isAuthChecked || isOffersLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HelmetProvider>

      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main} element={<MainScreen/>}/>
          <Route path={AppRoutes.Login} element={<LoginScreen />}/>
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesScreen/>
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoutes.Offer}/:id`} element={<OfferScreen/>}/>
          <Route path='*' element={<NotFoundScreen />}/>


        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
