import React, {Component} from 'react';
import{
    FlatList,
} from 'react-native';
import ObjComment from '../Objects/ObjComment.js';
import {
    EpisodeCommentItem
} from '../Components/index.js';

export default class EpisodeCommentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ObjComment,
        }
    }

    renderCommentItem(item) {
        return (
            <EpisodeCommentItem data={item}/>
        )
    }

    render() {
        return (
            <FlatList
                style={{flex: 1}}
                data={ObjComment}
                keyExtractor={item => item.id}
                renderItem={({item}) => this.renderCommentItem(item)}/>
        );
    }
}