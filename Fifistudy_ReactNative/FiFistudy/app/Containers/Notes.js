import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

import styles from '../Styles/Notes.js';

import { MonthItem } from '../Components/index.js';
import listNotes from '../Objects/ObjNote.js';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: listNotes
        }
    }

    renderItem(item) {
        return (
            <MonthItem month={item.month} listSentences={item.listSentences} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => this.renderItem(item)}
                />
            </View>
        )
    }
}

export default Notes;