import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';

import styles from '../Styles/PopupListEpisode.js';
import windows from '../Themes/Window.js';
import lsEpisodes from '../Objects/ObjListEpisodes.js';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

export default class PopupListEpisode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ds: lsEpisodes
        }
    }

    renderItemEpisode(item) {
        return (
            <View style={styles.itemEpisode}>
                <Text style={styles.textEpisode}>
                    {item.name}
                </Text>
                <View style={styles.blackLine}>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.popupDialog.show()}
                >
                    <Text> Press </Text>
                </TouchableOpacity>
                <PopupDialog
                    width={windows.width * (2 / 3)}
                    dialogTitle={<DialogTitle title="Danh sách các tập" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog }}
                    dialogAnimation={slideAnimation}
                    overlayOpacity={0.5}>
                    {/* --- Component popup show --- */}
                    <FlatList
                        data={this.state.ds}
                        renderItem={({ item }) => this.renderItemEpisode(item)}
                    >
                    </FlatList>
                </PopupDialog>
            </View>
        );
    }
}