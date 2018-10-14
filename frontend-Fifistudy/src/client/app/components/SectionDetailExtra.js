import React from "react";
import CommentContainer from "./CommentContainer";
import RelatedFilmContainer from "./RelatedFilmContainer";

class SectionDetailExtra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="detail-extra">
                    <div className="detail-extra__item">
                        <div className="detail-extra__title">
                            BÌNH LUẬN
                        </div>
                        <CommentContainer data={this.props.data}/>
                    </div>
                    <div className="detail-extra__item">
                        <div className="detail-extra__title">
                            PHIM CÙNG CẤP ĐỘ
                        </div>
                        <RelatedFilmContainer data={this.props.data}/>
                    </div>

                </div>
            </div>
        )
    }
}
export default SectionDetailExtra