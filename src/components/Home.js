import React from 'react'
import ListContainer from './ListContainer'

const Home = ({setListId, userId}) => {
    return (
        <div>
            <ListContainer setListId={setListId} userId={userId}/>
        </div>
    )
}

export default Home
