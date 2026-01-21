import PizzaCard from '../components/PizzaCard.jsx';
import { pizzaList } from '../data/pizzaList.js';
import '../styles/pizzaHouse.css';

function PizzaList() {
  return (
    <section className="ph-section">
      <div className="ph-section-inner">
        <h2 className="ph-section-title">Our Menu</h2>
        <div className="ph-menu-grid">
          {pizzaList.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PizzaList;
