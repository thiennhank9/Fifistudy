import React from "react";
import StarRating from "./StarRating";
import {connect} from "react-redux";
import Spinner from "./Spinner";
import {withCookies} from "react-cookie";
import {getReviewFilm} from "../actions/dataIntropage";

class StarRatingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // disabled: true
        };
    }

    componentWillReceiveProps = (nextProps) => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        if (nextProps.isLogin !== this.props.isLogin) {
            if (nextProps.isLogin) {
                this.props.getReviewFilm(this.props.data.id, token);
            }

        }

    }

    componentWillMount = () => {
        // if (nextProps.film !== this.props.film) {
        //     if (_.has(nextProps.film, "data.data")) {
        //         this.props.getFilmByDifficult(nextProps.film.data.data.difficult_level);
        let {cookies} = this.props;
        let token = cookies.get("token");
        if (token) {
            this.props.getReviewFilm(this.props.data.id, token);
        }
        //     }
        // }
    }

    render() {
        if (this.props.isLogin) {
            if (this.props.isReviewed === null) {
                return (
                    <div className="star-rating-container__loading">
                        <div className="star-rating-container">
                            <Spinner/>
                        </div>
                    </div>
                )
            }
            else {
                if (this.props.isReviewed === 0) {
                    return (
                        <div className="star-rating-container">
                            <div className="tooltip">Bạn chưa đánh giá phim này</div>
                            <StarRating disabled={false} initialValue={this.props.data.average_score}
                                        data={this.props.data}/>
                        </div>
                    )
                }
                else {
                    return <div className="star-rating-container">
                        <div className="tooltip"> Bạn đã đánh giá {this.props.isReviewed}
                            <div className="star animate star__reviewed"><span className="full star-colour"
                                                                               data-value="5"></span><span
                                className="half star-colour" data-value="4.5"></span><span className="selected"></span>
                            </div>
                        </div>
                        <StarRating disabled={true} initialValue={this.props.data.average_score}
                                    data={this.props.data}/>
                    </div>
                }
            }
        }
        return (
            <StarRating disabled={true} initialValue={this.props.data.average_score} data={this.props.data}/>
        )


    }
}

const mapStateToProps = state => {
    return {
        isReviewed: state.dataIntropage.isReviewed,
        isLogin: state.app.isLogin
    }
}

export default connect(mapStateToProps, {getReviewFilm})(withCookies(StarRatingContainer))