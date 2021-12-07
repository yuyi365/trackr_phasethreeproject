import {useState, useEffect} from 'react'
import ListContainer from './ListContainer'
import NewList from './NewList';
import { CardGroup, Grid } from 'semantic-ui-react';

const Home = ({setListId, userId}) => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9292/lists/user_id/${userId}`)
        .then((res) => res.json())
        .then((data) => setLists(data));
      }, [])

    return (
        <div className='testDiv'>        
        
        <div className="item-cards-list">
            <h2>Your Lists</h2>
        </div>
       
        <CardGroup>
        <Grid container columns={3} stackable className="item-cards">
            <ListContainer setListId={setListId} userId={userId} lists={lists}/>
            <NewList userId={userId} lists={lists} setLists={setLists}/>

        </Grid>
        </CardGroup>
        
        </div>
    )
}

export default Home
