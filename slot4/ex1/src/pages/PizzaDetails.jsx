import { Link, useParams } from 'react-router-dom';
import { pizzaList } from '../data/pizzaList';
import '../styles/pizzaHouse.css';

function PizzaDetails() {
  const { id } = useParams();
  const pizzaId = Number(id);
  const pizza = pizzaList.find((p) => p.id === pizzaId);

  if (!pizza) {
    return (
      <section className="ph-section">
        <div className="ph-section-inner">
          <h2 className="ph-section-title">Pizza Details</h2>
          <p style={{ color: '#ddd' }}>Pizza not found.</p>
          <Link className="ph-details-back" to="/">
            ← Back to menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="ph-section">
      <div className="ph-section-inner">
        <div className="ph-details-header">
          <h2 className="ph-section-title" style={{ marginBottom: 0 }}>
            {pizza.name}
          </h2>
          <Link className="ph-details-back" to="/">
            ← Back to menu
          </Link>
        </div>

        <div className="ph-details-grid">
          <div className="ph-details-imageWrap">
            <img src={pizza.image} alt={pizza.name} />
            {pizza.tags?.length ? (
              <div className="ph-details-tags">
                {pizza.tags.map((t) => (
                  <span key={t} className="ph-details-tag">
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="ph-details-panel">
            <div className="ph-details-price">
              {pizza.oldPrice ? <del>${pizza.oldPrice.toFixed(2)}</del> : null}
              <strong>${pizza.price.toFixed(2)}</strong>
            </div>

            <p className="ph-details-desc">{pizza.description}</p>

            <div className="ph-details-meta">
              <div className="ph-details-metaItem">
                <div className="ph-details-metaLabel">Size</div>
                <div className="ph-details-metaValue">12 inch</div>
              </div>
              <div className="ph-details-metaItem">
                <div className="ph-details-metaLabel">Crust</div>
                <div className="ph-details-metaValue">Thin & Crispy</div>
              </div>
              <div className="ph-details-metaItem">
                <div className="ph-details-metaLabel">Bake</div>
                <div className="ph-details-metaValue">Wood-fired</div>
              </div>
            </div>

            <div className="ph-details-actions">
              <button className="ph-buy" type="button">
                Buy
              </button>
              <Link className="ph-details" to="/">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PizzaDetails;

