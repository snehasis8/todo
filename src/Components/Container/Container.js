import React, { Component } from 'react'
import Searchbar from '../SearchBar/Searchbar'
import BackgroundImg from './BackgroundImg';

export class ContainerBox extends Component {
    render() {
        return (


            <div>
                <BackgroundImg />
                <Searchbar />
            </div>

        );
    }
}

export default ContainerBox