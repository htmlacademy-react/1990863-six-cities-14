import { memo } from 'react';
import {useAppDispatch} from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';

function ErrorOffersScreenComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Ошибка загрузки данных</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="error__wrapper">
                <p className='error__text'><b>Не удалось загрузить данные</b></p>
                <button
                  onClick={() => {
                    dispatch(fetchOffersAction());
                  }}
                  className="error__button button"
                  type="button"
                >
                  Попробовать ещё раз
                </button>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main >
    </div >
  );
}

const ErrorOffersScreen = memo(ErrorOffersScreenComponent);
export default ErrorOffersScreen;
