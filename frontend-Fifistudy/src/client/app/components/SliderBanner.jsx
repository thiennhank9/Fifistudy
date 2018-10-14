import React from "react";
import Swiper from "react-id-swiper";
import BannerItem from "./BannerItem.jsx";

class SliderBanner extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        // this.renderSlides = this.renderSlides.bind(this);
    }

    renderSlides = () => {
        return this.props.data.map((item) => {
            return (
                <div key={item.id} className="slider-banner__slide">
                    <BannerItem data={item}/>
                </div>
            )

        })
    };

    render() {
        let configSwiper = {
            loopAdditionalSlides: 5,
            loop: true,
            speed: 1000,
            autoplay: 5000
        };
        return (

            <div className="slider-banner">
                <Swiper  {...configSwiper} containerClass='slider-banner__container'>
                    {
                        this.renderSlides()
                    }
                </Swiper>
            </div>
        )
    }
}

export default SliderBanner