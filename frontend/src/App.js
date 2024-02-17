import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import NewAccount from './pages/NewAccount';
import EditAccount from './pages/EditAccount';
import Categories from './pages/Categories';
import NewCategory from './pages/NewCategory';


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
            <Route path='/NewAccount' element={<NewAccount />}/>
            <Route path='/EditAccount/:id' element={<EditAccount />}/>
            <Route path='/Categories' element={<Categories />}/>
            <Route path='/NewCategory' element={<NewCategory />}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
