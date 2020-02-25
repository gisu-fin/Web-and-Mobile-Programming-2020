import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



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
                    <button onClick={() => this.setState({hyva: this.state.hyva + 1}) }> Hyvä </button>
                    <button onClick={() => this.setState({neutraali: this.state.neutraali + 1}) }> Neutraali </button>
                    <button onClick={() => this.setState({huono: this.state.huono + 1}) }> Huono </button>
                <h1>Statistiikka</h1>
                    <div>
                    <p>Hyvä {this.state.hyva}</p>
                    <p>Neutraali {this.state.neutraali}</p>
                    <p>Huono {this.state.huono}</p>
                    <p>Keskiarvo {keskiarvo}</p>
                    <p>Positiivisia {positiivisia}</p>
                    </div> 
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));


