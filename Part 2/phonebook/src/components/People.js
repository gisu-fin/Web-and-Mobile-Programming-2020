import React from 'react';

const People = ({state, deletePerson}) => {
    return( 
        <div>
            <h2>Numerot</h2>
            <table>
                <tbody>
                {state.persons.map(names => 
                <tr key = {names.name}> 
                <td> {names.name} </td>
                <td> {names.number} </td>
                <td> <button id = 'id' onClick = {deletePerson.bind(this, names.id)}> Poista</button> </td>
                </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default People