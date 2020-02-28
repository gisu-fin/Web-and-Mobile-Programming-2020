import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}> {text} </button>
)

const Statistic = (props) => ( 
    <tr><td>{props.text}</td><td>{props.counter}</td></tr> 
)

const Statistics = (props) => { 
    if (props.kaikki === 0) { 
        return (
            <div>
                <p>Yhtään palautetta ei ole annettu</p>
            </div>
        )
    }
    return ( 
      
    <table>
        <tbody>
            <Statistic text = "Hyvä" counter = {props.state.hyva} />
            <Statistic text = "Neutraali" counter = {props.state.neutraali} />
            <Statistic text = "Huono" counter = {props.state.huono} />
            <Statistic text = "Keskiarvo" counter = {props.keskiarvo} />
            <Statistic text = "Positiivisia" counter = {props.positiivisia} />    
        </tbody>  
    </table>
    )
    }

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          hyva: 0,
          neutraali: 0,
          huono: 0
        }
      }

    render () {

        const {hyva, neutraali, huono} = this.state

        //kaikki yhteen
        const kaikki = (hyva + neutraali + huono)

        //keskiarvo
        const keskiarvo = ((hyva*1 + neutraali*0 + huono*(-1))/kaikki).toFixed(2)

        //prosentti
        const positiivisia = ((hyva/kaikki)*100).toFixed(2)+"%"

        return (
            <div>                
                <h1>Anna palautetta</h1>
                    <Button handleClick= { () => this.setState ({hyva:this.state.hyva + 1 })} text = "Hyvä"/>
                    <Button handleClick= { () => this.setState ({neutraali:this.state.neutraali +1 })} text = "Neutraali"/>
                    <Button handleClick= { () => this.setState ({huono:this.state.huono +1 })} text = "Huono"/>
                <h1>Statistiikka</h1>
                    <Statistics 
                    state = {this.state}
                    keskiarvo = {keskiarvo} 
                    positiivisia = {positiivisia} 
                    kaikki = {kaikki} 
                    />
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));


