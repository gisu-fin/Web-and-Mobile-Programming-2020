import React from 'react';
import Form from './components/Form';
import People from './components/People';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '020-123456' }
      ],
      newName: '',
      newNumber: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('push')
    console.log(event.target)
    const person = {
      name: this.state.newName,
      number: this.state.newNumber
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
        newName: '',
        newNumber: ''
      })
  }
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({newNumber: event.target.value})
  }

  render() {

    
    return (
      <div>
      <Form 
        addPerson = {this.addPerson}
        handleNameChange = {this.handleNameChange}
        handleNumberChange = {this.handleNumberChange}
        state = {this.state}
      />
      <People
        state = {this.state}
      />
      </div>
    )
  }
}

export default App