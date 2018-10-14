import React from "react";
import {serverDomain} from "../config/server";
import {deleteVocabulary} from "../actions/api";
import {getVocabulary} from "../actions/dataUserpage";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {Link} from "react-router-dom";


class Vocabulary extends React.Component {
    constructor(props) {
        super(props);


    };


    onClickDelete = () => {
        let {vocabulary, episode, film} = this.props.data;
        let {cookies} = this.props;
        let token = cookies.get("token")
        deleteVocabulary(vocabulary.id, token).then(response => {
            if (response.data.errors == null) {
                this.props.getVocabulary(token);
            }
            else {
                alert("Xóa thất bại")
            }
        })
    }

    onClickEdit = () => {
        this.props.toggleModal(this.props.data);
    }

    render() {

        let {vocabulary, episode, film} = this.props.data;
        return (
            <div className="vocabulary" style={{backgroundImage: `url(${serverDomain + film.thumbnail})`}}>
                <div className="vocabulary__overlay">

                </div>
                <div className="vocabulary__control-overlay">

                </div>
                <div className="vocabulary__content">
                    <div className="vocabulary__en-name">
                        {vocabulary.vocabulary}
                    </div>
                    <div className="vocabulary__vi-name">
                        {vocabulary.meaning}
                    </div>
                </div>
                <div className="vocabulary__control">
                    <Link to={{
                        pathname: `/film/${film.slug}/${episode.number}`,
                        myParams: {ahihi: "ahihi"},
                        state: {currentTime: this.props.data.current_time}
                    }} className="material-icons vocabulary__icon">ondemand_video</Link>
                    <i onClick={this.onClickEdit} className="material-icons vocabulary__icon">edit</i>
                    <i onClick={this.onClickDelete} className="material-icons vocabulary__icon">
                        delete
                    </i>
                </div>
            </div>
        )
    }
}

export default connect(null, {getVocabulary})(withCookies(Vocabulary))