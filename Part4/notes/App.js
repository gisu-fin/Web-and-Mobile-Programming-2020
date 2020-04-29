import * as React from 'react';
import { Text, View, Button, TextInput, ScrollView, FlatList, Alert, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './Styles';
import Notes from './Notes';
import AddNotesScreen from './AddNotesScreen'

/*
<Stack.Screen name = "Notescreen" component = {Notes} />
<Stack.Screen name = "Add notes" component = {AddNotesScreen} />
*/

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen name = "NoteScreen" component = {Notes} />
        <Stack.Screen name = "AddNotes" component = {AddNotesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


