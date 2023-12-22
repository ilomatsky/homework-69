import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Autocomplete from './components/Autocomplete/Autocomplete';
import ShowDetails from './components/ShowDetails/ShowDetails';
import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Autocomplete/>}/>
      <Route path="/shows/:id" element={<ShowDetails/>}/>
      <Route path="*" element={(<h1>Not Found!</h1>)}/>
    </Routes>
  );
};

export default App;
