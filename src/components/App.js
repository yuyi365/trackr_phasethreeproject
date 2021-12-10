import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import List from './List';
import { useState, useEffect } from 'react';

const App = () => {
  const [listId, setListId] = useState("");
  const [lists, setLists] = useState([]);
  const userId = 1
  useEffect(() => {
    fetch(`https://fathomless-sands-79733.herokuapp.com/lists/user_id/${userId}`)
    .then((res) => res.json())
    .then((data) => setLists(data));
  }, [])

  return (
    <div className="app">
      <Switch>
        <Route exact path="/lists/:listId">
          <List listId ={listId} setListId={setListId} lists={lists} setLists={setLists}/>
        </Route>
        <Route exact path="/">
          <Home setListId={setListId} userId={userId} lists={lists} setLists={setLists}/>
        </Route>
      </Switch>
    </div>
    
  )
}

export default App

