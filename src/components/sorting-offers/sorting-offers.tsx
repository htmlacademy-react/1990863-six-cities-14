import { memo, useState } from 'react';
import { Sorting } from '../../types/sorting';
import classNames from 'classnames';
import { SortingMap } from '../../const/const';

type SortingOffersProps = {
  sortingByItem: Sorting;
  onChange: (newSorting: Sorting) => void;
}
function SortingOffersComponent({sortingByItem, onChange}: SortingOffersProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleSortingItemClick = (type: Sorting) => {
    onChange(type);
  };
  return(
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={() => setIsOpened((prevIsOpened) => !prevIsOpened)}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
      &nbsp;{SortingMap[sortingByItem]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={
        classNames(
          'places__options',
          'places__options--custom',
          {'places__options--opened': isOpened}
        )
      }
      >
        {
          Object.entries(SortingMap)
            .map(([type, value]) => (
              <li
                key={type}
                className={
                  classNames(
                    'places__option',
                    {'places__option--active': type === sortingByItem}
                  )
                }
                tabIndex={0}
                onClick={() =>{
                  handleSortingItemClick(type as Sorting);
                }}
              >
                {value}
              </li>
            ))
        }
      </ul>
    </form>
  );
}

const SortingOffers = memo(SortingOffersComponent);
export default SortingOffers;
