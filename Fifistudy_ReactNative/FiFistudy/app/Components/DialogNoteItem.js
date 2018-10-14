import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import styles from '../Styles/DialogNoteItem.js'

class DialogNoteItem extends Component {
    render() {
        return (
            <View style={styles.containerDropDown}>
                <TouchableOpacity>
                    <Text style={styles.textSetting}>
                        Đổi tên
                    </Text>
                </TouchableOpacity>
                <View style={styles.blackLine}>
                </View>
                <TouchableOpacity
                //onPress={() => this.deleteItems()}
                >
                    <Text style={styles.textSetting}>
                        Xóa
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DialogNoteItem;
