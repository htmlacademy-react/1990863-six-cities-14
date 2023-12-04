import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';
import { City } from '../../types/city';
import { useAppSelector } from '../../hooks';
import { favoriteOffersSortSelector } from '../../store/selectors';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import classNames from 'classnames';
import React, { memo } from 'react';


function FavoritesScreenComponent(): JSX.Element {
  const favoritesCity = new Set<City['name']>();
  const sortedFavorites = useAppSelector(favoriteOffersSortSelector);

  const isFavoritesEmpty = Boolean(!sortedFavorites.length);

  sortedFavorites.forEach(({city}) => {
    favoritesCity.add(city.name);
  });

  return(
    <div className={classNames('page', {'page--favorites-empty': isFavoritesEmpty})}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />

      <main
        className={classNames(
          'page__main',
          'page__main--favorites',
          {'page__main--favorites-empty': isFavoritesEmpty},
        )}
      >
        <div className="page__favorites-container container">
          <section className={classNames('favorites', { 'favorites--empty': isFavoritesEmpty })}>
            {isFavoritesEmpty ? <FavoritesEmpty/> : (
              <React.Fragment>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Array.from(favoritesCity).map((city) => (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {sortedFavorites.map((offer) => {
                          if(offer.city.name === city) {
                            return <OfferCard key={offer.id} offer={offer} block='favorites' size='small' />;
                          }
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const FavoritesScreen = memo(FavoritesScreenComponent);
export default FavoritesScreen;
