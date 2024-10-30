import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Outlet } from "react-router-dom";
import HeaderSlider from './components/home/HeaderSlider';
import HomeHeader from './components/home/HomeHeader';
import Footer from './components/home/Footer';
import BoxChat from './components/home/BoxChat';

import Store from './reducer/Store';


function App() {

  return (
    <div>
      <Provider store={Store}>
        <HeaderSlider />
        <HomeHeader />
        <Outlet />
        {/* <BoxChat /> */}
        <Footer />
      </Provider>


    </div >
  );
}

export default App;