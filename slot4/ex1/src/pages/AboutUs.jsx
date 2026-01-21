import '../styles/pizzaHouse.css';

function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="ph-section-inner">
          <h1 className="about-hero-title">About Pizza House</h1>
          <p className="about-hero-subtitle">Crafting Authentic Italian Experiences Since 2018</p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="ph-section">
        <div className="ph-section-inner">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="story-title">Our Story</h2>
              <div className="story-text">
                <p>
                  Pizza House was born from a passion for authentic Italian cuisine and a dream to bring
                  the warmth of traditional Italian dining to our community. What started as a small family
                  kitchen has grown into a beloved local institution.
                </p>
                <p>
                  Our founder, Chef Marco Rossi, immigrated from Naples, Italy, bringing with him the
                  traditional recipes and techniques passed down through generations. Every pizza we serve
                  tells a story of heritage, craftsmanship, and the joy of sharing good food.
                </p>
              </div>
            </div>
            <div className="story-image">
              <img src="/images/c1.jpg" alt="Our cozy restaurant interior" className="story-main-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="ph-section-inner">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Pizzas Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="ph-section">
        <div className="ph-section-inner">
          <h2 className="section-title">What Makes Us Special</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔥</div>
              <h3>Wood-Fired Oven</h3>
              <p>
                Our authentic wood-fired oven, imported from Italy, reaches temperatures of up to 900°F,
                creating the perfect crust with that signature char and smoky flavor.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Fresh Ingredients</h3>
              <p>
                We source our ingredients daily from local farms and trusted Italian importers.
                Our dough is made fresh every morning, never frozen.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Master Chefs</h3>
              <p>
                Our chefs trained in Naples bring authentic techniques and passion to every pizza.
                Each one is handcrafted with precision and love.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Family Atmosphere</h3>
              <p>
                Whether you're celebrating a special occasion or just enjoying a casual meal,
                our warm, welcoming atmosphere feels like home.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Location & Hours */}
      <section className="location-section">
        <div className="ph-section-inner">
          <div className="location-grid">
            <div className="location-info">
              <h2>Visit Us</h2>
              <div className="location-details">
                <div className="location-item">
                  <h4>📍 Address</h4>
                  <p>123 Pizza Street<br />Downtown District<br />Pizza City, PC 12345</p>
                </div>
                <div className="location-item">
                  <h4>🕒 Hours</h4>
                  <p><strong>Monday - Thursday:</strong> 11:00 AM - 10:00 PM<br />
                     <strong>Friday - Saturday:</strong> 11:00 AM - 11:00 PM<br />
                     <strong>Sunday:</strong> 12:00 PM - 9:00 PM</p>
                </div>
                <div className="location-item">
                  <h4>📞 Contact</h4>
                  <p><strong>Phone:</strong> (555) 123-PIZZA<br />
                     <strong>Email:</strong> hello@pizzahouse.com<br />
                     <strong>Reservations:</strong> (555) 123-RESERVE</p>
                </div>
              </div>
            </div>
            <div className="location-image">
              <img src="/images/c3.jpg" alt="Our restaurant location" className="location-main-image" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

