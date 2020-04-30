import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, FlatList, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import styles from './Styles';


class Notes extends React.Component {
  state = {
    notes: [],
    newNote: ''
  }

  
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
  //olisko pitänyt olla note olio jolla id ja sisältö? tutki ja kokeile jos jää aikaa.
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

/*
  async fetchOne(key) {
    try {
      const fetchedNote =  await AsyncStorage.getItem(key);
      const note = JSON.parse(fetchedNote);
      return note;
    } catch (error) {
      console.log(error.message);
    }
    return
  }
*/

//haetaan kaikki avaimet ja kaikki data, muokataan niin ettei avaimet tule mukaan ja lisätään tilaan
  fetchAll = async () => {
    try {

      const keys = await AsyncStorage.getAllKeys() 
      //console.log('fetchall keys ' + keys)

      const data = await AsyncStorage.multiGet(keys)
      console.log('fetchall notes ' + data)
      //console.log(data[0][1])

      // ei olisi pakko olla tässä muodossa muokkaa jos on aikaa muokata
      // ei kaunis ratkaisu mutta toimii silti
      const notes = data.map((note, i) => {
        const apu = data[i][1]
        //mitähän tehty väärin kun on aivan sama käyttääkö parsea vai ei. :thinking:
        JSON.parse(apu)
        const help = apu.replace(/^"|"$/g, '');
        console.log(help + 'muoks')
        this.setState({
          notes: this.state.notes.concat(help),
          newNote: ''
        })
      })
      
      //this.setState({notes: notes})
      return notes

    } catch (error) {
        console.log(error, "problem")
    }
  }

  /*
  testinä, ei tarvii enää?
  displayData = () => {  
    const notes = this.fetchAll()
    console.log (notes)
    alert (notes)
  }  
  <TouchableOpacity onPress ={this.displayData}>  
          <Text>Click to display data</Text>  
        </TouchableOpacity>   

  */

  render() {

    return (

      <ScrollView style={styles.container}>

        <Text style={styles.header}>Notes</Text>

        <TouchableOpacity onPress ={this.remove}>  
          <Text>Click to delete all</Text>  
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