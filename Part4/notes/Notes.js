import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, FlatList, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import styles from './Styles';

class Notes extends React.Component {
  state = {
    notes: [
      'TestiNote1',
      'TestiNote2'
    ],
    newNote: ''
  }

  
  showNotes() {
    const show = this.state.notes.map(note => (
      <Text style={styles.note}> {note} </Text>
    ))
    return show
  }


  componentDidUpdate(prevProps) {
    if (this.props.route.params?.note !== prevProps.route.params?.note) {
      this.handleAdd()
    }
  }

  handleAdd = () => {

  this.setState({
    notes: this.state.notes.concat(this.props.route.params.note),
    newNote: ''
  })
  
  }

  render() {

    return (

      <ScrollView style={styles.container}>

        <Text style={styles.header}>Notes</Text>

        {this.showNotes()}
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNotes', { notes: this.state.notes })}>
          <Text style = {styles.button}>Add new note!</Text>
        </TouchableOpacity>

      </ScrollView>

    );
  }
}

export default Notes;