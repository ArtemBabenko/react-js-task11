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
            valueNext: '',
            progress: 0,
            isHidden: true
        }
        this.getToChars();

    }

    getToChars = () => {

        this.setState({ progress: 0 });
        (page === 1) ? axios.get(`https://rickandmortyapi.com/api/character/`, {
            onDownloadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                this.setState({ progress: percentCompleted });
            }
        })
            .then(({ data }) => {
                this.setState({ chars: data.results });
                this.setState({ pages: data.info.pages });
                if (this.state.progress === 100) { this.toggleHidden() };
            }) :
            axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`, {
                onDownloadProgress: (progressEvent) => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.setState({ progress: percentCompleted });
                }
            })
                .then(({ data }) => {
                    this.setState({ chars: data.results });
                    if (this.state.progress === 100) { this.toggleHidden() };
                });
    }

    getPrevPage = () => {
        this.toggleHidden();
        page -= 1;
        this.getToChars();
        if (page === 1) { this.setState({ valuePrev: '' }) };
        if (page < this.state.pages) { this.setState({ valueNext: '' }) };
    }

    getNextPage = () => {
        this.toggleHidden();
        page += 1;
        this.getToChars();
        if (page > 1) { this.setState({ valuePrev: 'Im Mr. Meeseeks, look at me!!!' }) };
        if (page === this.state.pages) { this.setState({ valueNext: 'Im Mr. Meeseeks, look at me!!!' }) };
    }

    toggleHidden = (state) => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    LoadingWindow = () => (
        <CharListView.ContainerLoading><span>Loading...</span></CharListView.ContainerLoading>
    )

    CharWindow = () => (
        <CharListView.ContainerCard>{this.state.chars ? this.state.chars.map(char => <Char {...char} key={char.id} />) : ''}</CharListView.ContainerCard>
    )

    render() {

        return (
            <CharListView.htmlClear>
                <CharListView.ContainerListView >
                    {this.state.isHidden && <this.LoadingWindow />}
                    {!this.state.isHidden && <this.CharWindow />}
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