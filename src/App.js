import React from 'react'; 
import {BrowserRouter} from 'react-router-dom'; 
import MainRouter from './MainRouter';

//This component is being used as a wrapper for our whole application.
const App = () => (
  <BrowserRouter> 
  <MainRouter />
  </BrowserRouter>
);

export default App;
