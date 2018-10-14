// comment item for ScreenEpisodeComment
import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    FlatList,
} from 'react-native';
import {
    AvatarView,
    ImageButton,
} from '../Components/index.js';
import Resources from '../Resources/index.js';
import Styles from '../Styles/EpisodeCommentItem.js';

export default class EpisodeCommentItem extends Component {
    getColor(comment){
        return comment.is_liked === true ? Resources.colors.yellow : Resources.colors.blue;
    }

    render(){
        const {data} = this.props;
        
        return (
            <View style={Styles.container}>
                {/* Account's Avatar */}
                <View>
                    <AvatarView source={data.avatar}/>
                </View>

                <View style={Styles.contentContainer}>
                    <View style={Styles.headerContainer}>
                        {/* Account's first_name last_name */}                        
                        <Text style={Styles.accountName}>{data.first_name} {data.last_name}</Text>
                        {/* Created date */}
                        <Text style={Styles.dateTime}>{data.createdAt}</Text>
                    </View>

                    {/* Comment content */}
                    <Text style={Styles.data}>{data.content}</Text>

                    {/* Liked view */}
                    <View style={Styles.likedContainer}>
                        <ImageButton source={Resources.icons.like} tintColor={this.getColor(data)}/>
                        <Text style={[Styles.like_number, {color: this.getColor(data)}]}>{data.like_number}</Text>
                    </View>

                    {/* Line */}
                    <View style={Styles.line}/>
                </View>
            </View>
        );
    }
}