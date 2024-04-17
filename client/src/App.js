import './App.css';
import {Route,Routes} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadGames } from './Redux/Actions/ActionsCreators'
import { useEffect } from 'react';
import DetailPage from './components/DetailPage/DatailPage';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import FormPage from './components/FormPage/FormPage';


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
      <Route path={"/form"} element={<FormPage/>}/>
      <Route path={"/detail/:id"} element={<DetailPage/>}/>
    </Routes>
  </>
  );
}

export default App;
