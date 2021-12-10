import {useState, useEffect} from 'react'
import ListContainer from './ListContainer'
import NewList from './NewList';
import Header from './Header';
import { CardGroup, Grid } from 'semantic-ui-react';

const Home = ({setListId, userId, lists, setLists}) => {

    const [open, setOpen] = useState(false);
    
    return (
        <div className='testDiv'> 

        <Header />       
        <div className="item-cards-list">
            <h2>Your Lists</h2>
        </div>
        
       
        <CardGroup>
        <Grid container columns={3} stackable className="item-cards">
            <ListContainer setListId={setListId} userId={userId} lists={lists} setOpen={setOpen}/>
        </Grid>

        <Grid container columns={1} stackable className="item-cards">
            <NewList userId={userId} lists={lists} setLists={setLists} open={open} setOpen={setOpen}/>
        </Grid>
        </CardGroup>
        
        </div>
    )
}

export default Home
