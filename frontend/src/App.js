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
import Budget from './pages/Budget';
import NewBudget from './pages/NewBudget';
import EditBudget from './pages/EditBudget';
import Goal from './pages/Goal';
import NewGoal from './pages/NewGoal';
import EditGoal from './pages/EditGoal';
import Expense from './pages/Expense';
import NewTransaction from './pages/NewTransaction';
import EditTransaction from './pages/EditTransaction';


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
            <Route path='/Budget' element={<Budget />}/>
            <Route path='/NewBudget' element={<NewBudget />}/>
            <Route path='/EditBudget/:id' element={<EditBudget/>}/>
            <Route path='/Goal' element={<Goal/>}/>
            <Route path='/NewGoal' element={<NewGoal/>}/>
            <Route path='/EditGoal/:id' element={<EditGoal/>}/>
            <Route path='/Expense' element={<Expense/>}/>
            <Route path='/NewTransaction' element={<NewTransaction/>}/>
            <Route path='/EditTransaction/:id' element={<EditTransaction/>}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
