import React, { Component } from 'react'
import axios from 'axios';
import Char from './Character';
import CharListView from './char.list.view';

let page = 1;

class CharList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chars: '',
            pages: '',
            valuePrev: '',
            valueNext: ''
        } 
        this.getToChars();

    }


    getToChars = () => {
        (page === 1) ? axios.get(`https://rickandmortyapi.com/api/character/`)
            .then(({ data }) => {
                this.setState({ chars: data.results });
                this.setState({ pages: data.info.pages });
            }) :
            axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
                .then(({ data }) => {
                    this.setState({ chars: data.results });
                });
        
    }

    getPrevPage = () => {
        page -= 1;
        this.getToChars();
        if (page === 1) { this.setState({ valuePrev: '' }) };
        if (page < this.state.pages) { this.setState({ valueNext: '' }) };
    }

    getNextPage = () => {
        page += 1;
        this.getToChars();
        if (page > 1) { this.setState({ valuePrev: 'Im Mr. Meeseeks, look at me!!!' }) };
        if (page === this.state.pages) { this.setState({ valueNext: 'Im Mr. Meeseeks, look at me!!!' }) };
    }

    render() {
        return (
            <CharListView.htmlClear>
                <CharListView.ContainerListView >
                    <CharListView.ContainerCard>{this.state.chars ? this.state.chars.map(char => <Char {...char} key={char.id} />) : ''}</CharListView.ContainerCard>
                    <CharListView.ButtonContainer>
                        <CharListView.Button ref="btnPrev" onClick={this.getPrevPage} disabled={!this.state.valuePrev}>Prev</CharListView.Button>
                        <CharListView.Button ref="btnNext" onClick={this.getNextPage} disabled={this.state.valueNext}>Next</CharListView.Button>
                    </CharListView.ButtonContainer>
                </CharListView.ContainerListView >
            </CharListView.htmlClear>
        )
    }
}

export default CharList;