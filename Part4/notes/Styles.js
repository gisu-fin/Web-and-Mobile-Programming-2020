import { StyleSheet } from "react-native";

// flexDirection, alignItems, and justifyContent to change the layout.
const styles = StyleSheet.create({
    note: {
        fontSize: 25,
        padding: 30
    },
    header: {
        flex:1,
        backgroundColor: '#119DA4',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 15,
        color: '#040404',
        //justifyContent: 'flex-end'
    },
    input: {
        fontSize: 20,
        padding: 10,
        backgroundColor: '#E7E8DE'
    },
    footer: {
        flex: 1,
        marginBottom: 36
    },
    container: {
        flex: 1,
        backgroundColor: '#DFE1D6',
        //justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#0C7489',
        color: 'white',
        fontSize: 20,
        padding: 20,
        //alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles;

