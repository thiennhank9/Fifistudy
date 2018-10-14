import React from "react";
import FlipMove from "react-flip-move";
import Film from "../components/Film";

class SectionSavedFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderVocabulary = () => {
        return this.props.data.map(item => {
            return (
                <div key={item.id} className="section-saved-film__item">

                    <Film isSaved={true} data={item.film_detail}/>

                </div>

            )
        })
    }

    render() {
        return (
            <div>
                <div className="section-vocabulary__title">
                    PHIM ĐÃ LƯU
                </div>
                <FlipMove enterAnimation="fade" leaveAnimation="fade" className="section-vocabulary">
                    {
                        this.renderVocabulary()
                    }
                    {/*<div className="divider"></div>*/}
                </FlipMove>
            </div>

        )
    }
}

export default SectionSavedFilm