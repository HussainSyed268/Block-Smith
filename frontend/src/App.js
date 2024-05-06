import './App.css';
import Nav from './components/Navbar';
import HomeSection from './components/HomeSection';
import ParticleBackground from './ParticleBackground';
import Advantage from './components/Advantages';
import Bux from './components/Bux';
import Works from './components/Works';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
    <ParticleBackground id="particles" />
    <Nav/>
    <HomeSection/>
    <Advantage/>
    <Bux/>
    <Works/>
    <Footer/>
    </div>
  );
}

export default App;
