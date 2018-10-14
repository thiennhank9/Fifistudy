import React from "react";
import {connect} from "react-redux";
import ListActor from "./ListActor";
import Spinner from "./Spinner";

class ListActorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderContent = () => {

        let {actor} = this.props;
        if (actor.isLoading) {
            return (
                <div className="list-actor__actors  list-actor__info--loading">
                    <Spinner/>
                </div>
            )
        }
        else {
            if (actor.data.errors == null) {
                if (actor.data.data.length > 0) {
                    return (
                        <ListActor data={actor.data.data}/>
                    )
                }
                else {
                    return (
                        <div className="list-actor__actors list-actor__no-data">
                            Chưa cập nhật diễn viên
                        </div>
                    )
                }
            }
        }
    };


    render() {
        // return (
        //     <div className="list-actor">
        //         <div className="container">
        //             {
        //                 this.renderContent()
        //             }
        //
        //             <div className="divider"></div>
        //         </div>
        //     </div>
        // )
        return (
            <div className="list-actor">
                <div className="container">
                    <div className="list-actor__info">
                        <div className="list-actor__wrap">
                            <div className="list-actor__title">
                                DIỄN VIÊN
                            </div>
                            <div className="divider"></div>
                            {
                                this.renderContent()
                            }
                            <div className="divider"></div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        actor: state.dataIntropage.actor
    }
}

export default connect(mapStateToProps)(ListActorContainer)
