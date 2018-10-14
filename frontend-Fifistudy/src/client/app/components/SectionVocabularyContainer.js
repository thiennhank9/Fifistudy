import React from "react";
import {connect} from "react-redux";
import {getVocabulary} from "../actions/dataUserpage";
import {withCookies} from "react-cookie";
import SectionVocabulary from "./SectionVocabulary";

class SectionVocabularyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentWillMount = () => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        this.props.getVocabulary(token)
    }

    renderContent = () => {

        let {vocabulary} = this.props;
        if (vocabulary.isLoading) {
            return (
                <div className="list-actor__no-data"> Đang tải ... </div>
            )
        }
        else {
            if (vocabulary.data.errors == null) {
                if (vocabulary.data.data.length > 0) {
                    return (
                        <SectionVocabulary data={vocabulary.data.data}/>
                    )
                }
                else {
                    return (
                        <div className="list-actor__no-data">Chưa có từ vựng</div>
                    )
                }
            }
        }
    };


    render() {
        return (

            <div>
                {
                    this.renderContent()
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vocabulary: state.dataUserpage.vocabulary
    }
}

export default connect(mapStateToProps, {getVocabulary})(withCookies(SectionVocabularyContainer))
