import React from "react";
function roundHalf(num) {
    return Math.round(num * 2) / 2;
}
export default function ({score}) {
    const renderStar = () => {
        let arr = [];
        let halfStar = parseFloat(roundHalf(score)) / 0.5;
        let quotient = Math.floor(halfStar / 2);
        let remainder = halfStar % 2;
        for (let i = 0; i < 5; i++) {
            if (i < quotient) {
                arr.push(<i className="fa fa-star"/>)
            }

            else {
                arr.push(
                    <i className="fa fa-star-o"/>)
            }

        }
        if (remainder) {
            arr.splice(quotient, 1,

                <i className="fa fa-star-half-o"/>
            )
        }
        return arr;
    }
    return (
        <div className="score">
            {
                renderStar()
            }
        </div>
    )
}