import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../Styles/ScreenMovieComment.js';
import { CommentContainer } from '../Containers/index.js';

class ScreenMovieComment extends Component {
    render() {
        return (
            <View style={styles.container}>
                <CommentContainer />
            </View>
        )
    }
}

export default ScreenMovieComment;