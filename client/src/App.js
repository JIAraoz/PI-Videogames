import './App.css';
import {Route,Routes} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadGames } from './Redux/Actions/ActionsCreators'
import { useEffect } from 'react';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(loadGames());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])





      return (<>
  <Routes>
      <Route path={"/"} element={<LandingPage/>}/>
      <Route path={"/home"} element={<HomePage/>}/>
    </Routes>
  </>
  );
}

export default App;
