import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, FlatList, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import styles from './Styles';


class Notes extends React.Component {
  state = {
    notes: [],
    newNote: ''
  }

  /*
{
      id: '',
      note: ''
    }
  */
  componentDidMount(){
    const notes = this.fetchAll()
    console.log(notes)
  }

  showNotes() {
    if (this.state.notes.length == 0) {
      return <Text style={styles.note}>No notes, maybe you should add some?</Text>
    }else { 
    const show = this.state.notes.map(note => (
      <Text style={styles.note}> {note} </Text>
    ))
    return show
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.route.params?.note !== prevProps.route.params?.note) {
      this.handleAdd()
    }
  }

  
  remove = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      console.log('removessa' + keys)
      await AsyncStorage.multiRemove(keys)
      console.log('multiremove tehty')
    } catch (error) {
      console.log ('removessa' + error)
    }
  }
  

  handleAdd = async () => {
  
  const uusi = this.props.route.params.note
  const ID = Math.floor(Math.random() * 1000) + 1
  try {
    AsyncStorage.setItem(ID.toString(), JSON.stringify(uusi)).then (() => {
      console.log(ID + ' -id handleadd note: ' + uusi + ' lisäys onnistui')  
      this.setState({
        notes: this.state.notes.concat(uusi),
        newNote: ''
      })
    })  
  }catch (err){
    console.log (err)
  }

  }

  fetchAll = async () => {
    try {
      
      const keys = await AsyncStorage.getAllKeys() 
      console.log('fetchall keys ' + keys)
      const notes = await AsyncStorage.multiGet(keys)
      console.log('fetchall notes ' + notes)
      this.setState({notes: notes})
      return notes

    } catch (error) {
        console.log(error, "problem")
    }
  }

  displayData = () => {  
    const notes = this.fetchAll()
    console.log (notes)
    alert (notes)
    /*
    try {  
      const keys = await AsyncStorage.getAllKeys()
      console.log(keys)
      const result = await AsyncStorage.multiGet(keys)
      //return 
      result.map(req => JSON.parse(req)).forEach(console.log);
      //alert(note);  
    }  
    catch(error){  
      alert(error)  
    }
    */
  }  
  

  render() {

    return (

      <ScrollView style={styles.container}>

        <Text style={styles.header}>Notes</Text>

        <TouchableOpacity onPress ={this.remove}>  
          <Text>Click to delete all</Text>  
        </TouchableOpacity>    
        <TouchableOpacity onPress ={this.displayData}>  
          <Text>Click to display data</Text>  
        </TouchableOpacity>   

        {this.showNotes()}
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNotes', { notes: this.state.notes })}>
          <Text style = {styles.button}>Add new note!</Text>
        </TouchableOpacity>

      </ScrollView>

    );
  }
}

export default Notes;