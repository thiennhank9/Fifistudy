import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../Styles/ScreenNotes.js';
import { Notes } from '../Containers/index.js';

class ScreenNotes extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Notes />
            </View>
        )
    }
}

export default ScreenNotes;