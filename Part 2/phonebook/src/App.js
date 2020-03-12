import React from 'react';
import Form from './components/Form';
import People from './components/People';
import axios from 'axios';

/*
2.9 Telephone directory, part 6
At the moment, the new numbers added to the directory are not sent to the server. 
Change the app so that its state is synchronized with the server state
*/




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    }
    console.log('constructor')
  }

  componentDidMount(){
    console.log ('did mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log ('promise fullfilled')
        this.setState({persons: response.data})
      })
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
          newNumber: '',

        })
  } else {
    axios.post('http://localhost:3001/persons', person)
    .then(response => {
      this.setState({
        persons: this.state.persons.concat(response.data),
        newName: '',
        newNumber: ''
      })
      console.log(response)
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

  console.log ('render') 

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