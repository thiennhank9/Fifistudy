import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import FadeTransition from "../components/FadeTransition";
import UserAvatar from "../components/UserAvatar";
import ScrollBar from "../components/ScrollBar";
import SectionSavedFilmContainer from "../components/SectionSavedFilmContainer";
import SectionVocabularyContainer from "../components/SectionVocabularyContainer";
import _ from "lodash";
import {connect} from "react-redux";
import SectionUserInfoContainer from "../components/SectionUserInfoContainer";


class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderUserInfo = () => {
        if (_.has(this.props.userInfo, "data.errors")) {
            if (this.props.userInfo.data.errors == null) {
                return <UserAvatar data={this.props.userInfo.data.data}/>
            }
        }
        return null
    }

    render() {
        return (
            <FadeTransition>
                <div className="container">
                    <div className="user-page clearfix">
                        <Tabs>
                            <div className="user-page__menu">
                                {this.renderUserInfo()}
                                <div className="user-menu">
                                    <TabList className="user-menu__ul user-menu__ul--user">
                                        <Tab selectedClassName="user-menu__li--selected"
                                             className="user-menu__li user-menu__li--user">
                                            <i className="fa fa-user-o user-menu__icon"></i>
                                            <span className="user-menu__text user-menu__text--user">
                                            THÔNG TIN CÁ NHÂN
                                        </span>
                                        </Tab>
                                        <Tab selectedClassName="user-menu__li--selected"
                                             className="user-menu__li user-menu__li--user">
                                            <i className="fa fa-film user-menu__icon"></i>
                                            <span className="user-menu__text user-menu__text--user">
                                           phim đã lưu
                                        </span></Tab>
                                        <Tab selectedClassName="user-menu__li--selected"
                                             className="user-menu__li user-menu__li--user">
                                            <i className="fa fa-pencil-square-o user-menu__icon"></i>
                                            <span className="user-menu__text user-menu__text--user">
                                           từ vựng đã lưu
                                        </span></Tab>
                                    </TabList>
                                </div>

                            </div>


                            <div className="user-page__scroll">
                                <ScrollBar>
                                    <div className="user-page__content">
                                        <TabPanel>
                                            <SectionUserInfoContainer/>
                                        </TabPanel>
                                        <TabPanel>
                                            <SectionSavedFilmContainer/>
                                        </TabPanel>
                                        <TabPanel>
                                            <SectionVocabularyContainer/>
                                        </TabPanel>
                                    </div>
                                </ScrollBar>
                            </div>


                        </Tabs>


                    </div>
                </div>
            </FadeTransition>
        )

    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo
    }
}
export default  connect(mapStateToProps)(UserPage)