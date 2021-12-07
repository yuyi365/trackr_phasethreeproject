import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import List from './List';
import { useState } from 'react';

const App = () => {
  const [listId, setListId] = useState("");
  const userId = 1

  return (
    <div>
      <Switch>
        <Route exact path="/lists/:listId">
          <List listId ={listId} setListId={setListId}/>
        </Route>
        <Route exact path="/">
          <Home setListId={setListId} userId={userId}/>
        </Route>
      </Switch>
    </div>
    
  )
}

export default App

