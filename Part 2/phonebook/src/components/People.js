import React from 'react';

const People = ({state}) => {
    return( 
        <div>
            <h2>Numerot</h2>
            <ul>
                {state.persons.map(names => <p key = {names.name}> {names.name} {names.number} </p>)}
            </ul>
        </div>
    )
}

export default People