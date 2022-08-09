import React from 'react'
import './App.scss';
import Header from './pages/Header';
import Mint from './pages/Mint';
import ChickenCard from './pages/ChickenCard';
import Roadmap from './pages/Roadmap';
import Faq from './pages/Faq';
import Reward from './pages/Reward';
import Footer from './pages/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

export const UserContext = React.createContext();
function App() {
  const location = useLocation();
  const { pathname } = location;

  const [collection, setCollection] = React.useState({});

  const updateCollection = (value) => {
    let dataJSON = require(`./config/bull.mint.json`);

    try {
      if (value === '/') {
         dataJSON = require(`./config/bull.mint.json`);
      } else {
         dataJSON = require(`./config${value}.mint.json`);
      }
    } catch (error) {
      console.log(error);
      dataJSON = require(`./config/bull.mint.json`);
    }
    setCollection(dataJSON);

    document.querySelector(':root').style.setProperty('--theme-color', dataJSON.background)
  }
  
  React.useEffect(() => {
    updateCollection(pathname);
  }, [pathname]);

  return (
    <UserContext.Provider value={{ collection }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Header />
        <Mint />
        <ChickenCard />
        <Roadmap />
        <Faq />
        <Reward />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
