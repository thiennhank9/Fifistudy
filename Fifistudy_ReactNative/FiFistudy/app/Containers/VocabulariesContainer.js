import React, {Component} from 'react';
import{
    FlatList,
} from 'react-native';
import ObjVocabularies from '../Objects/ObjVocabularies.js';
import { VocabularyItem } from '../Components/index.js';

export default class VocabulariesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ObjVocabularies,
        }
    }

    renderCommentItem(item) {
        return (
            <VocabularyItem data={item}/>
        )
    }

    render() {
        return (
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{alignItems: 'center'}}
                showsVerticalScrollIndicator={false}
                data={ObjVocabularies}
                keyExtractor={item => item.id}
                renderItem={({item}) => this.renderCommentItem(item)}/>
        );
    }
}