import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, FlatList, Alert, AsyncStorage } from 'react-native';
import styles from './Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

class AddNotesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newNoteText: ''
    };
  }

  handleAdd = () => {
    //tsekkaa datan
    console.log(this.state.newNoteText)
    //const uusi = this.state.newNote
    //tarkistetaan onko jo olemassa 
    if (this.props.route.params.notes.map(note => note).includes(this.state.newNoteText)) {
      Alert.alert(
        'Huomio!',
        this.state.newNoteText + ' on jo olemassa!',
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "default"
          }
        ],
        { cancelable: false }
      );

      this.setState({ newNoteText: '' })
    } else {
      //lisätään listaan ja tyhjennetään
      /*
      this.setState({
        notes: this.state.notes.concat(this.state.newNote),
        newNote: ''
      })
      */
      this.props.navigation.navigate('NoteScreen', { note: this.state.newNoteText });  

    }

  }


  render() {
    return (
      <View style = {styles.container}>

        <TextInput
          style={styles.input}
          value={this.state.newNoteText}
          placeholder='Write the note here'
          onChangeText={(text) => this.setState({ newNoteText: text })}
        />

        <TouchableOpacity onPress={this.handleAdd}>
          <Text style = {styles.button}>Add new note!</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default AddNotesScreen