import { Link } from 'react-router-dom';
import '../styles/pizzaHouse.css';

function PizzaCard({ pizza }) {
  const badge = pizza.tags?.[0];

  return (
    <div className="ph-card">
      <div className="ph-card-imgWrap">
        {badge ? <div className="ph-badge">{badge.toUpperCase()}</div> : null}
        <img src={pizza.image} alt={pizza.name} />
      </div>
      <div className="ph-card-body">
        <h3 className="ph-card-name">{pizza.name}</h3>
        <p className="ph-card-price">
          {pizza.oldPrice ? <del>${pizza.oldPrice.toFixed(2)}</del> : null}
          <strong>${pizza.price.toFixed(2)}</strong>
        </p>
        <div className="ph-card-actions">
          <button className="ph-buy" type="button">
            Buy
          </button>
          <Link className="ph-details" to={`/pizza/${pizza.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PizzaCard;
