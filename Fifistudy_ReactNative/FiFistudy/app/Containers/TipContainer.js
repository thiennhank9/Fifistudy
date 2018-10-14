import React, { Component } from 'react';
import {
  FlatList
} from 'react-native';
import TipItem from '../Components/TipItem.js';
import Obj from '../Objects/ObjTips.js';


export default class TipItemContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: Obj
        }
    }

    renderItem(item) {
        return (
            <TipItem data={item}/>
        )
    }

    render(){
        return (
            <FlatList
            horizontal={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={Obj}
            keyExtractor={item => item.id}
            renderItem={({item}) => this.renderItem(item)}/>
        );
    }
}