import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    note: {
        fontSize: 20,
        padding: 25,
        color: '#242423'
    },
    header: {
        flex:1,
        backgroundColor: '#066875',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        color: '#ECECEC',
    },
    input: {
        fontSize: 20,
        padding: 15,
        backgroundColor: '#E7E8DE'
    },
    notesection: {
        flex: 2,
        flexGrow: 3,
    },
    bottom: {
        flex: 1,
        marginBottom: 36
    },
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#066875',
        color: '#E1E1E1',
        fontSize: 20,
        padding: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 50,
        margin: 10
    },
    delete:{
        backgroundColor: '#E67B86',
        padding: 15,
        fontSize: 15,
        textAlign: 'center',
        borderRadius: 50,
        marginHorizontal: 10,
    }
})

export default styles;