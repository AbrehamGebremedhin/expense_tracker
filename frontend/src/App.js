import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Accounts from './pages/Accounts';


function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries:{
        refetchInterval: 20000,
        refetchOnWindowFocus: false
      }
    }
  });
  return (
    <div>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path='/SignUp' element={<SignUp />}/>
            <Route path='/' element={<Login />}/>
            <Route path='/Home' element={<Home />}/>
            <Route path='/Accounts' element={<Accounts />}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
