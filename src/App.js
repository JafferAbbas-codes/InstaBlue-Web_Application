import React from 'react'; //used in every component
import {BrowserRouter} from 'react-router-dom'; 
import MainRouter from './MainRouter';

const App = () => (
  <BrowserRouter> 
  <MainRouter />
  </BrowserRouter>
);

export default App;
