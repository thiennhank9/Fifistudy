import React from "react";
import PropTypes from "prop-types";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {getReviewFilm, updateFilm} from "../actions/dataIntropage";
import {postReviewFilm} from '../actions/api'

function roundHalf(num) {
    return Math.round(num * 2) / 2;
}

class StarRating extends React.Component {
    constructor(props) {
        super(props);
        // alert(roundHalf(this.props.initialValue));
        this.state = {

            currentValue: this.props.initialValue,
            isClicked: false,
            currentClick: null,
            classStar1: "",
            classStar2: "",
            classStar3: "",
            classStar4: "",
            classStar5: "",
            classHalfStar1: "",
            classHalfStar2: "",
            classHalfStar3: "",
            classHalfStar4: "",
            classHalfStar5: "",
        };
    }

    isFloat = (value) => {
        return ((value / 0.5) % 2 !== 0)
    }

    onMouseEnter = (value) => {
        // alert('hi')
        this.setState({
            currentValue: value
        })
    }
    updateData = () => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        // alert(token)

        // Token cho nay
        this.props.updateFilm(this.props.data.slug, token);
        this.props.getReviewFilm(this.props.data.id, token);
    }


    postReviewFilm = (score) => {
        // debugger
        let {data, cookies} = this.props;
        postReviewFilm({
            "score": parseFloat(score),
            "film_id": data.id
        }, cookies.get("token")).then(response => {
            // console.log('resssssss', response);
            if (response.errors == null) {
                this.updateData();
                // alert('Thanh cong')
            }
        })
    }

    destroyAction = () => {
        $('.star').off("click");
        $('.half').off("click");
        $('.half').unbind("hover");
        $('.full').off("click");
        $('.full').unbind("hover");
        $('.rating').off("mouseleave");
    }

    componentWillUnmount = () => {
        // alert('unmount')
        this.destroyAction();
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.disabled !== this.props.disabled) {
            if (nextProps.disabled) {
                // alert('true')
                this.destroyAction();

            } else {
                // alert('false')
                this.initAction();
            }

        }
        if (nextProps.initialValue !== this.initialValue) {
            this.initStar(nextProps.initialValue)
        }
    }


    initStar = (value) => {
        let roundValue = parseFloat(roundHalf(value));
        // alert(roundValue)
        if ((roundValue / 0.5) % 2 === 0) {
            this.setFullStarState($(`.full[data-value=${roundValue}]`));

        }
        else {
            this.setHalfStarState($(`.half[data-value="${roundValue}"]`));
        }
    }
    componentDidMount = () => {
        this.initStar(this.props.initialValue);
        // let {data, cookies} = this.props;
        if (this.props.disabled === true) {
            return
        }

        this.initAction();
    };

    updateStarState = (target) => {
        $(target).parent().prevAll().addClass('animate');
        $(target).parent().prevAll().children().addClass('star-colour');

        $(target).parent().nextAll().removeClass('animate');
        $(target).parent().nextAll().children().removeClass('star-colour');
    };

    setHalfStarState = (target) => {
        $(target).addClass('star-colour');
        $(target).siblings('.full').removeClass('star-colour');
        this.updateStarState(target)
    };

    setFullStarState = (target) => {
        $(target).addClass('star-colour');
        $(target).parent().addClass('animate');
        $(target).siblings('.half').addClass('star-colour');

        this.updateStarState(target)
    };

    calculateAverage = () => {
        var average = 0

        $('.rating').each(function () {
            average += $(this).data('vote')
        })

        $('.js-average').text((average / $('.rating').length).toFixed(1))
    };

    initAction = () => {
        var starClicked = false;
        let instance = this;

        $('.star').on("click", function () {
            if (starClicked === false) {
                $(this).children('.selected').addClass('is-animated');
                $(this).children('.selected').addClass('pulse');

                var target = this;

                setTimeout(function () {
                    $(target).children('.selected').removeClass('is-animated');
                    $(target).children('.selected').removeClass('pulse');
                }, 1000);

                starClicked = true;
            }
        });

        $('.half').on("click", function () {
            if (starClicked == true) {
                instance.setHalfStarState(this)
            }
            $(this).closest('.rating').find('.js-score').text($(this).data('value'));
            // alert($(this).data('value'));
            instance.postReviewFilm($(this).data('value'));
            $(this).closest('.rating').data('vote', $(this).data('value'));
            instance.calculateAverage()
            // console.log(parseInt($(this).data('value')));

        })

        $('.full').on("click", function () {
            if (starClicked == true) {
                instance.setFullStarState(this)
            }
            // debugger
            $(this).closest('.rating').find('.js-score').text($(this).data('value'));
            instance.postReviewFilm($(this).data('value'));
            // alert();
            $(this).find('js-average').text(parseInt($(this).data('value')));

            $(this).closest('.rating').data('vote', $(this).data('value'));
            instance.calculateAverage()

            // console.log(parseInt($(this).data('value')));
        })

        $('.half').hover(function () {
            if (starClicked == false) {
                instance.setHalfStarState(this)
            }

        })

        $('.full').hover(function () {
            if (starClicked == false) {
                // console.log(this, "Thisssssss")
                instance.setFullStarState(this)
            }
        })

        $('.rating').on("mouseleave", () => {
            if (starClicked === false) {
                if ((this.props.initialValue / 0.5) % 2 === 0) {
                    instance.setFullStarState($(`.full[data-value=${this.props.initialValue}]`));

                }
                else {
                    instance.setHalfStarState($(`.half[data-value="${this.props.initialValue}"]`));
                }
            }

        })
    }


    render() {
        return (
            <div className="rating" data-vote="0">


                <div className="star">

                    <span className="full" data-value="1"></span>
                    <span className="half" data-value="0.5"></span>
                    <span className="selected"></span>

                </div>

                <div className="star">

                    <span className="full" data-value="2"></span>
                    <span className="half" data-value="1.5"></span>
                    <span className="selected"></span>

                </div>

                <div className="star">

                    <span className="full" data-value="3"></span>
                    <span className="half" data-value="2.5"></span>
                    <span className="selected"></span>

                </div>

                <div className="star">

                    <span className="full" data-value="4"></span>
                    <span className="half" data-value="3.5"></span>
                    <span className="selected"></span>

                </div>

                <div className="star">

                    <span className="full" data-value="5"></span>
                    <span className="half" data-value="4.5"></span>
                    <span className="selected"></span>

                </div>

            </div>


        )
    }
}

StarRating.propTypes = {
    disabled: PropTypes.bool.isRequired,
    initialValue: PropTypes.bool.isRequired
}

export default connect(null, {updateFilm, getReviewFilm})(withCookies(StarRating))
