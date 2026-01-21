import '../styles/pizzaHouse.css';

function BookTable() {
  return (
    <section className="ph-section">
      <div className="ph-section-inner">
        <h2 className="ph-section-title" style={{ textAlign: 'center' }}>
          Book Your Table
        </h2>

        <div className="ph-form-grid">
          <input className="ph-input" placeholder="Your Name *" />
          <input className="ph-input" placeholder="Your Email *" />
          <select className="ph-select" defaultValue="">
            <option value="" disabled>
              Select a Service
            </option>
            <option>Dine in</option>
            <option>Take away</option>
            <option>Delivery</option>
          </select>
        </div>

        <textarea className="ph-textarea" placeholder="Please write your comment" />

        <div style={{ marginTop: '12px' }}>
          <button className="ph-send" type="button">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}

export default BookTable;

