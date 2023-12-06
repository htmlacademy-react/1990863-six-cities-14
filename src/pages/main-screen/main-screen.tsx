import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import { OfferPreview } from '../../types/offer-preview';
import { insertPlural } from '../../utils/common';
import OffersListMemo from '../../components/offers-list/offers-list';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { City } from '../../types/city';
import Map from '../../components/map/map';
import EmptyList from '../../components/empty-list/empty-list';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import SortingOffers from '../../components/sorting-offers/sorting-offers';
import { Sorting } from '../../types/sorting';
import { getSortedOffers } from '../../store/selectors';
import { getActiveCity, getOffers, getSortingItem } from '../../store/slices/offers/selectors';
import { setActiveCity, setSortingItem } from '../../store/slices/offers/offers';

function MainScreenComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const sortingByItem = useAppSelector(getSortingItem);
  const activeCity = useAppSelector(getActiveCity);
  const [searchParams, ] = useSearchParams({city: activeCity});
  const activeCityParam = searchParams.get('city') as City['name'];

  useEffect(() => {
    dispatch(setActiveCity(activeCityParam));
  }, [activeCityParam, dispatch]);

  const [activeCard, setActiveCard] = useState<OfferPreview['id'] | null>(null);

  const locationActiveCity = useMemo(() => offers.find(({city}) => city.name === activeCity)?.city as City, [activeCity, offers]);
  const filteredOffersByCity = useMemo(() => offers.filter((offer) => offer.city.name === activeCity), [activeCity, offers]);

  const offersLength = filteredOffersByCity.length;

  const handleCardHover = useCallback((id: OfferPreview['id'] | null) => {
    setActiveCard(id);
  }, []);

  const handleSortingItemClick = useCallback((type: Sorting) => {
    dispatch(setSortingItem(type));
  }, [dispatch]);

  const sortedOffers = useAppSelector((state) => getSortedOffers(state, filteredOffersByCity));
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header/>

      <main className={classNames(
        'page__main',
        'page__main--index',
        {'page__main--index-empty': !offersLength}
      )}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations activeCity={activeCity} />
        </div>
        <div className="cities">
          {
            !offersLength ? <EmptyList activeCity={activeCity} /> :
              (
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offersLength} place{insertPlural(offersLength)} to stay in {activeCity}</b>
                    <SortingOffers sortingByItem={sortingByItem} onChange={handleSortingItemClick}/>
                    <OffersListMemo block='cities' offers={sortedOffers} onCardHover={handleCardHover}/>
                  </section>
                  <div className="cities__right-section">
                    <Map
                      block='cities'
                      city={locationActiveCity}
                      offers={sortedOffers}
                      selectedOffer={activeCard}
                    />
                  </div>
                </div>
              )
          }
        </div>
      </main>
    </div>
  );
}

const MainScreen = memo(MainScreenComponent);
export default MainScreen;
