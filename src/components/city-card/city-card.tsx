import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSelectedPoint } from '../../store/action';
import { changeFavorite } from '../../store/api-action';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';

type OfferProps = {
  offer: Offer;
  cardType: 'default' | 'near';
}

function CityCard({ offer, cardType }: OfferProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const handleAddFavorite = () => {
    dispatch(changeFavorite({
      favorites: favorites,
      offerId: offer.id,
      status: favorites.includes(offer.id) ? 0 : 1
    }));
  };
  return (
    <article className={`${cardType === 'default' ? 'cities__card place-card' : 'near-places__card place-card'}`} onMouseEnter={() => dispatch(changeSelectedPoint(offer.location))} onMouseLeave={() => dispatch(changeSelectedPoint(undefined))}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={favorites.includes(offer.id) ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button" onClick={handleAddFavorite}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
export default CityCard;
