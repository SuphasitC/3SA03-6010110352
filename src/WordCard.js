import React, { Component } from 'react';
import CharacterCard from './CharacterCard';
import './App.css';
import _ from 'lodash';

const prepareStateFromWord = (given_word) => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attempt: 1,
        guess: [],
        isWin: false,
        completed: false
    }
}

export default class Wordcard extends Component {
    constructor(props){
        super(props)
        this.state = prepareStateFromWord(this.props.value)
    }
    
    activationHandler = (c) => {
        console.log(`${c} has been activated.`)
        let guess = [...this.state.guess, c]
        this.setState({guess})
        if(guess.length == this.state.chars.length){
            if(guess.join('').toString() == this.state.word){
                this.setState({guess: [], completed: true, isWin: true, attempt: this.state.attempt + 1})
            }else{
                if(this.state.attempt == 3){
                    this.setState({guess: [], completed: true, isWin: false})
                }
                let chars = _.shuffle(Array.from(this.state.word))
                this.setState({guess: [], chars:chars, attempt: this.state.attempt + 1})
            }
        }
    }

    windowReload = () =>{
        window.location.reload()
    }

    render() {
        return (
            <div className="App">
                <h1>Round : {this.state.completed ? this.state.attempt - 1 : this.state.attempt} / 3</h1>
                {Array.from(this.state.chars).map((c, i) => <CharacterCard value={c} key={i} attempt = {this.state.attempt} activationHandler={this.activationHandler}/>)}
                <p><button onClick={this.windowReload}>TryNewWord</button></p>
                <p>{this.state.isWin ? <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQoJQ3aO04SyaUV57ZsQ_eRz2bG8oyMpp28JVZTpjN1U0Iiz1ge" width = "300" height = "300"></img> : <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQH_-d2jrOIMM_nJMwkky0VkTvKtliFzBqGWSOaGG_KIrGylBVn" width = "300" height = "300"></img>}</p>
                <h3>{this.state.completed ? "Answer = " + this.state.word : ""}</h3>
                <h6>Created By : Suphasit Chiathamrongkiarti 6010110352 section 01</h6>
            </div>
        );
    }
}
