import React from 'react'

function BookingForm() {
  return (
    <main className="booking-page">
      {/* Chỉ hiển thị khung form ở giữa giống hình mẫu */}
      <section className="booking-card booking-card-centered" aria-label="Thông tin hành trình">
          <header className="booking-card-header">
            <span className="booking-card-title">Thông tin hành trình</span>
            <nav className="booking-trip-type" aria-label="Loại chuyến đi">
              <button type="button" className="booking-chip booking-chip-active">
                Khứ hồi
              </button>
              <button type="button" className="booking-chip">
                Một chiều
              </button>
            </nav>
          </header>

          <form className="booking-form">
            <fieldset className="booking-fieldset booking-fieldset-inline">
              <legend className="booking-legend">Điểm đi / Điểm đến</legend>
              <section className="booking-field">
                <label className="booking-label">ĐIỂM ĐI</label>
                <section className="booking-input-wrapper">
                  <input
                    type="text"
                    className="booking-input"
                    defaultValue="Hà Nội (HAN)"
                    aria-label="Điểm đi"
                  />
                </section>
              </section>

              <section className="booking-swap-wrapper">
                <button
                  type="button"
                  className="booking-icon-button"
                  aria-label="Đổi điểm đi / đến"
                >
                  ⇄
                </button>
              </section>

              <section className="booking-field">
                <label className="booking-label">ĐIỂM ĐẾN</label>
                <section className="booking-input-wrapper">
                  <input
                    type="text"
                    className="booking-input"
                    defaultValue="Hồ Chí Minh (SGN)"
                    aria-label="Điểm đến"
                  />
                </section>
              </section>
            </fieldset>

            <fieldset className="booking-fieldset booking-fieldset-inline">
              <legend className="booking-legend">Ngày đi / Ngày về</legend>
              <section className="booking-field">
                <label className="booking-label">NGÀY ĐI</label>
                <section className="booking-input-wrapper booking-input-with-icon">
                  <input
                    type="text"
                    className="booking-input"
                    defaultValue="09/30/2017"
                    aria-label="Ngày đi"
                  />
                  <span className="booking-input-icon">📅</span>
                </section>
                <p className="booking-helper-text">
                  Bạn chỉ có thể đặt tối đa 1 năm
                </p>
              </section>

              <section className="booking-field">
                <label className="booking-label">NGÀY VỀ</label>
                <section className="booking-input-wrapper booking-input-with-icon">
                  <input
                    type="text"
                    className="booking-input"
                    placeholder="mm/dd/yyyy"
                    aria-label="Ngày về"
                  />
                  <span className="booking-input-icon">📅</span>
                </section>
              </section>
            </fieldset>

            <fieldset className="booking-fieldset booking-fieldset-passengers">
              <legend className="booking-legend">Hành khách</legend>
              <section className="booking-field">
                <label className="booking-label">NGƯỜI LỚN</label>
                <section className="booking-input-wrapper">
                  <select className="booking-select" defaultValue="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </section>
                <p className="booking-helper-text">12+ tuổi</p>
              </section>

              <section className="booking-field">
                <label className="booking-label">TRẺ EM</label>
                <section className="booking-input-wrapper">
                  <select className="booking-select" defaultValue="0">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </section>
                <p className="booking-helper-text">2 - 12 tuổi</p>
              </section>

              <section className="booking-field">
                <label className="booking-label">EM BÉ</label>
                <section className="booking-input-wrapper">
                  <select className="booking-select" defaultValue="0">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </section>
                <p className="booking-helper-text">0 - 2 tuổi</p>
              </section>
            </fieldset>

            <footer className="booking-submit-row">
              <button type="submit" className="booking-submit-button">
                🔍 TÌM CHUYẾN BAY
              </button>
            </footer>
          </form>
      </section>
    </main>
  )
}

export default BookingForm

