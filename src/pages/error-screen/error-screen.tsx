import { memo } from 'react';
import {useAppDispatch} from '../../hooks';
import { changeFavoriteStatusAction} from '../../store/api-actions';
import { OfferPreview } from '../../types/offer-preview';

type ErrorScreenProps = {
  id: OfferPreview['id'];
  isFavorite: OfferPreview['isFavorite'];
}

function ErrorScreenComponent({id, isFavorite}: ErrorScreenProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="error__text">Не удалось добавить в избранные.</p>
      <button
        onClick={() => {
          dispatch(changeFavoriteStatusAction({id, status: Number(isFavorite)}));
        }}
        className="replay replay--error"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
}

const ErrorScreen = memo(ErrorScreenComponent);
export default ErrorScreen;
