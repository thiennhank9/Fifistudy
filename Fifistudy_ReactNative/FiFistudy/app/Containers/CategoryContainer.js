import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import {ImageButton, CategoryItem} from '../Components/index.js';
import Res from '../Resources/index.js';
import Obj from '../Objects/ObjCategories.js';

export default class CategoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: Obj,
        }
    }

    renderItem(item) {
        return (
            <CategoryItem data={item} navigation={this.props.navigation}/>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                marginLeft: 16,
                marginRight: 16,
            }}>
                <FlatList
                    horizontal={false}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.dataSource}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => this.renderItem(item)}/>
            </View>
        );
    }
}