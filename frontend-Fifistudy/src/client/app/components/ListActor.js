import React from "react";
import Actor from "./Actor";
import Slider from "react-slick";

function NextArrow(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={"fa fa-angle-right list-actor__button list-actor__button--next"}
            onClick={onClick}
        >
        </div>
    );
}
function PrevArrow(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={"fa fa-angle-left list-actor__button list-actor__button--prev"}
            onClick={onClick}
        >
        </div>
    );
}

export default class ListActor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderActor = () => {
        return this.props.data.map(item => {
            return (
                <div>
                    <Actor data={item}/>
                </div>)

        })
    }

    render() {
        var settings = {
            dots: false,
            speed: 1000,
            slidesToShow: 6,
            slidesToScroll: 2,
            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>,
            autoplay: true,
            infinite: true,
            responsive: [{breakpoint: 767, settings: {slidesToShow: 5}}, {breakpoint: 479, settings: {slidesToShow: 3}}]
        };
        return (


            <div className="list-actor__actors">

                <Slider {...settings}>
                    {
                        this.renderActor()
                    }
                </Slider>

            </div>
        )
    }
}