import '../styles/pizzaHouse.css';

function Contact() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="ph-section-inner">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">We'd Love to Hear From You</p>
        </div>
      </section>


      {/* Map & Directions */}
      <section className="map-section">
        <div className="ph-section-inner">
          <div className="map-content">
            <div className="map-info">
              <h2>How to Find Us</h2>
              <p>
                Located in the heart of downtown, we're easily accessible by car, public transportation,
                or on foot. Ample street parking is available, and our nearest subway station is just
                2 blocks away.
              </p>
              <div className="directions">
                <h4>🚗 By Car:</h4>
                <p>Take Exit 45 from I-95, head east on Main St. Turn right onto Pizza Street.</p>

                <h4>🚇 By Public Transit:</h4>
                <p>Take the Red Line to Downtown Station. Walk 2 blocks north on Pizza Street.</p>

                <h4>🚶 Walking:</h4>
                <p>From City Center, walk 10 minutes south along the main boulevard.</p>
              </div>
            </div>
            <div className="map-placeholder">
              <img src="/images/pizza3.jpg" alt="Restaurant location map" className="map-image" />
              <div className="map-overlay">
                <p>📍 Interactive Map Coming Soon</p>
                <p>123 Pizza Street, Pizza City</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="form-section">
        <div className="ph-section-inner">
          <h2 className="section-title">Send Us a Message</h2>
          <p className="section-description">
            Have a special request, feedback, or just want to say hello? Fill out the form below
            and we'll get back to you as soon as possible.
          </p>

          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject">
                    <option value="">Select a topic</option>
                    <option value="reservation">Make a Reservation</option>
                    <option value="catering">Catering Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="general">General Question</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows="5" required
                  placeholder="Tell us how we can help you..."></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>

            <div className="contact-sidebar">
              <img src="/images/c3.jpg" alt="Our restaurant" className="sidebar-image" />
              <div className="quick-info">
                <h4>Quick Info</h4>
                <ul>
                  <li>🍕 Average wait time: 15-20 minutes</li>
                  <li>👥 Parties up to 50 people</li>
                  <li>🎂 Birthday packages available</li>
                  <li>♿ Wheelchair accessible</li>
                  <li>🐾 Pet-friendly outdoor seating</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="social-section">
        <div className="ph-section-inner">
          <h2>Follow Us</h2>
          <p>Stay connected for the latest updates, specials, and behind-the-scenes content.</p>
          <div className="social-links">
            <a href="#" className="social-link fb">Facebook</a>
            <a href="#" className="social-link ig">Instagram</a>
            <a href="#" className="social-link tw">Twitter</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;

