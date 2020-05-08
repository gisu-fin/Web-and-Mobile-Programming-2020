import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, FlatList, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import styles from './Styles';


class Notes extends React.Component {
  state = {
    notes: [],
    newNote: ''
  }

//selvitä ja korjaa: Warning: Each child in a list should have a unique "key" prop 

  componentDidMount() {
    const notes = this.fetchAll()
    console.log(notes)
  }

/*
  Errorit poiston jälkeen tulee nyt täältä. 
  Tulkitsee pituuden noten sisällön pituudeksi jos vain yksi note.
  Esim moi olis 3 vaikka vain yksi note ja pituus siis 1.
  Jos monta notea, laskee oikein.
  Tuloste
  multiremove tehty
  fetchall notes 
  addnotesscreenin handleadd teksti: Enough do go
  addnotesscreenin handleadd pituus: 0
  Jos palauttaa nollan, lisätään suoraan.
  50 -id handleadd note: Enough do go lisäys onnistui
  shownotesin else: notes pituus 12
  shownotesin else: notes sisältö Enough do go
  shownotesin else: notes pituus 12
  shownotesin else: notes sisältö Enough do go

  undefined is not a function (near '...this.state.notes.map...')
  * Notes.js:31:18 in showNotes
  * Notes.js:170:10 in render
  
  uudelleen latauksen jälkeen:
  fetchall notes 50,"Enough do go"
  shownotesin else: notes pituus 1
  shownotesin else: notes sisältö Enough do go

*/
  showNotes() {
    if (this.state.notes.length == 0) {
      return <Text style={styles.note}>No notes, maybe you should add some?</Text>
    } else {
      console.log('shownotesin else: notes pituus ' + this.state.notes.length)
      console.log('shownotesin else: notes sisältö ' + this.state.notes)
      const show = this.state.notes.map(note => (
        <Text style={styles.note}> {note} </Text>
        //jos jää aikaa - muuta touchableksi, lisää kokeeksi muokkaus, key pitää toki hommata jostain
      ))
      return show
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.route.params?.note !== prevProps.route.params?.note) {
      this.handleAdd()
    }
  }

  //ei toiminutkaan näin, ehkä metodia kutsuessa olisi myös pitänyt olla await :thinking:
  /*
  keys = async () => {
    const keys = [await AsyncStorage.getAllKeys()]
    //console.log('keys metodi: ' + keys)
    return keys
  }
  */

  //deleten jälkeen erroria yhtäkkiä uutta notea lisätessä johtuukohan mergestä? ei ehdi korjata, otetaan
  //jos jää aikaa - keys omaksi funktioksi joka palauttaa avaimen ja yksittäisen poisto
  delete = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      console.log('removessa' + keys)
      await AsyncStorage.multiRemove(keys)
      console.log('multiremove tehty')
      this.fetchAll()
      this.setState({
        notes: '',
        newNote: ''
      })
    } catch (error) {
      console.log('removessa' + error)
    }
  }

  //poistaa kaiken 
  remove = () => {

    Alert.alert(
      'Alert!',
      'Are you sure about deleting ALL notes?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "YES! Delete everything",
          onPress: () => {
            console.log("OK Pressed")
            this.delete()
          },
          style: "default"
        }
      ],
      { cancelable: false }
    );

  }

  
  handleAdd = async () => {

    const uusi = this.props.route.params.note
    const ID = Math.floor(Math.random() * 1000) + 1
    //olisko pitänyt olla note olio jolla id ja sisältö? tutki ja kokeile jos jää aikaa.
    try {
      AsyncStorage.setItem(ID.toString(), JSON.stringify(uusi)).then(() => {
        console.log(ID + ' -id handleadd note: ' + uusi + ' lisäys onnistui')
        this.setState({
          notes: this.state.notes.concat(uusi),
          newNote: ''
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

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
        //console.log(help + 'muoks')
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
 delete pois kunnes korjattu 
  
            <TouchableOpacity onPress={this.remove}>
              <Text style={styles.delete}>Delete all</Text>
            </TouchableOpacity>

  */

  render() {

    return (

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.header}>Notes</Text>
          </View>

          <View style={styles.notesection} >
            {this.showNotes()}
          </View>


          <View style={styles.bottom} >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNotes', { notes: this.state.notes })}>
              <Text style={styles.button}>Add new note!</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.remove}>
              <Text style={styles.delete}>Delete all</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Notes;