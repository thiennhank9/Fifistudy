import React from 'react';
import { withNavigation } from 'react-navigation';

import {ImageSlider } from './index.js';

import Obj from '../Objects/ObjTemp.js';

class Banner extends React.Component{
    constructor(props){
        super(props);
        this.state={
            position:1,
        };
    }
    render(){
        return (
            <ImageSlider
                navigation={this.props.navigation}
                dataSource={this.props.data}
                position={this.state.position}
                onPostionChange={position => this.setState({ position })} />

        )
    }
}

export default withNavigation(Banner)