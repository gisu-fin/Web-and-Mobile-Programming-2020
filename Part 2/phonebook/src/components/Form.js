import React from 'react';

const Form = ({addPerson, handleNameChange, handleNumberChange, state}) => {

    return( 

<div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit = {addPerson}>
          <div>
            nimi: <input 
            value = {state.newName} 
            onChange = {handleNameChange}
            />
          </div>
          <div>
            numero: <input 
            value = {state.newNumber} 
            onChange = {handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      </div>

    )
}
export default Form