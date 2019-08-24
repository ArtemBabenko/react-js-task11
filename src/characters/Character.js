import React, { Component } from 'react';
import CharView from './char.view';


class Characters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            img: this.props.image

        }
    }

    render() {
        return (
            <CharView.Card>
                <div>
                    <CharView.CardImg src={this.state.img} />
                    <div>{this.state.name}</div>
                </div>
            </CharView.Card>
        )
    }
}

export default Characters; 

