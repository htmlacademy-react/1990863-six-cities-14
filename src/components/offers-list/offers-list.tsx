import classNames from 'classnames';
import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card/offer-card';
import { BlocksName } from '../../types/blocks';
import { memo } from 'react';

type OffersListProps = {
  block: BlocksName;
  offers: OfferPreview[];
  onCardHover?: (offer: OfferPreview['id'] | null) => void;
};
function OffersListComponent({block, offers, onCardHover}: OffersListProps): JSX.Element {
  return(
    <div className={classNames(
      'places__list',
      {
        'tabs__content cities__places-list': block === 'cities',
        'near-places__list': block === 'near'
      }
    )}
    >
      {
        offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} block={block} onCardHover={onCardHover} />
        ))
      }
    </div>
  );
}

const OffersList = memo(OffersListComponent);
export default OffersList;
