import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import styles from '../Styles/DailyNoteItem.js';
import res from '../Resources/index.js';
import { DialogNoteItem } from './index.js';

class DailyNoteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPressed: false,
        }
    }

    changeStatePressed() {
        this.setState({
            isPressed: !this.state.isPressed
        })
    }


    renderPessed() {
        return (
            <View style={styles.container}>
                <View style={styles.containerRow1}>
                    <View style={styles.circle}>
                        <Text style={styles.textDate}>
                            {this.props.day}
                        </Text>
                    </View>
                    <View style={styles.sentenceContainer}>
                        <Text style={styles.textSentence}>
                            {this.props.sentence}
                        </Text>
                        <View style={styles.icon}>
                            <TouchableOpacity
                                onPress={() => this.changeStatePressed()}
                            >
                                <Image style={styles.icon}
                                    source={res.ic_more}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.containerBot}>
                    <DialogNoteItem />
                </View>
            </View>
        )
    }

    renderNormal() {
        return (
            <View style={styles.container}>
                <View style={styles.containerRow1}>
                    <View style={styles.circle}>
                        <Text style={styles.textDate}>
                            {this.props.day}
                        </Text>
                    </View>
                    <View style={styles.sentenceContainer}>
                        <Text style={styles.textSentence}>
                            {this.props.sentence}
                        </Text>
                        <View style={styles.icon}>
                            <TouchableOpacity
                                onPress={() => this.changeStatePressed()}
                            >
                                <Image style={styles.icon}
                                    source={res.ic_more}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        if (!this.state.isPressed)
            return this.renderNormal();
        return this.renderPressed();
    }
}

export default DailyNoteItem;