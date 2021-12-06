import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import List from './List';
import { useState } from 'react';

const App = () => {
  const [listId, setListId] = useState("");
  const userId = 1

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/lists/:listId">
          <List listId ={listId}/>
        </Route>
        <Route exact path="/">
          <Home setListId={setListId} userId={userId}/>
        </Route>
      </Switch>
    </div>
    
  )
}

export default App

