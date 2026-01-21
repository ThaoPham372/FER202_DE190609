import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BookTable from './components/BookTable.jsx';
import Footer from './components/Footer.jsx';
import HeroCarousel from './components/HeroCarousel.jsx';
import PizzaHouseNavbar from './components/NavbarSearch.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Contact from './pages/Contact.jsx';
import PizzaDetails from './pages/PizzaDetails.jsx';
import PizzaList from './pages/PizzaList.jsx';
import './styles/pizzaHouse.css';

function Home() {
  return (
    <>
      <HeroCarousel />
      <PizzaList />
      <BookTable />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="ph-page">
                <PizzaHouseNavbar />
        <div className="ph-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pizza/:id" element={<PizzaDetails />} />
          </Routes>
        </div>
        <Footer
          myProfile={{
            name: 'Thao Pham',
            email: 'thaopham@gmail.com',
            avatar: '/images/20.jpg',
          }}
        />
      </div>
    </Router>
  );
}

export default App;
