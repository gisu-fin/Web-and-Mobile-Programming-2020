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
            <Statistic text = "Hyvä" counter = {props.hyva} />
            <Statistic text = "Neutraali" counter = {props.neutraali} />
            <Statistic text = "Huono" counter = {props.huono} />
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

    klikHyva = () => {
        this.setState({hyva:this.state.hyva + 1})
    }

    klikNeutraali = () => {
        this.setState({neutraali:this.state.neutraali + 1})
    }
   
    klikHuono = () => {
        this.setState({huono:this.state.huono + 1})
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
                    <Button handleClick={this.klikHyva} text = "Hyvä"/>
                    <Button handleClick={this.klikNeutraali} text = "Neutraali"/>
                    <Button handleClick={this.klikHuono} text = "Huono"/>
                <h1>Statistiikka</h1>
                    <Statistics hyva = {hyva} neutraali = {neutraali} huono = {huono}
                    keskiarvo = {keskiarvo} positiivisia = {positiivisia} kaikki = {kaikki} />
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));


