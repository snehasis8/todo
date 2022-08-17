import React, { Component } from 'react'
import Searchbar from '../SearchBar/Searchbar'
import { Container } from '@mui/material';

export class ContainerBox extends Component {
    render() {
        return (
            <Container  >
                <Searchbar />
            </Container>
        );
    }
}

export default ContainerBox