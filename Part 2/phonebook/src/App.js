import React from 'react';
import Form from './components/Form';
import People from './components/People';
import axios from 'axios';

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
  }//add

  deletePerson = (id) => {
    console.log ('deletessä')

    const thisDude = this.state.persons.find(p => p.id === id);
    
    if (window.confirm("Haluatko oikeasti poistaa " + thisDude.name + ":n ?")){ 
      axios
      .delete('http://localhost:3001/persons/'+ id)
      .then(response => {
        console.log(response) 
        const people = this.state.persons.filter(p => p.id !== thisDude.id)  
        this.setState({persons:people})
      })//then
    }//if
  }//deleteperson

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
        deletePerson = {this.deletePerson}
      />
      </div>
    )
  }
}

export default App