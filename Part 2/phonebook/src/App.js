import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('push')
    console.log(event.target)
    const person = {
      name: this.state.newName
    }

    if (this.state.persons.map (person => person.name).includes(this.state.newName)){
        alert (this.state.newName + ' on jo olemassa, lisää uusi nimi')
        this.setState({
          newName: '',
          newNumber: ''
        })
  } else {
    const persons = this.state.persons.concat(person)
      this.setState({
        persons: persons,
        newName: ''
      })
  }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({newName: event.target.value})
  }

  render() {

    
    return (
      <div>
        debug: {this.state.newName} 
        <h2>Puhelinluettelo</h2>
        <form onSubmit = {this.addPerson}>
          <div>
            nimi: <input 
            value = {this.state.newName} 
            onChange = {this.handleNameChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(names => <p key = {names.name}> {names.name} </p>)}
        </ul>

      </div>
    )
  }
}

export default App