import React from "react";
import Vocabulary from "./Vocabulary";
import FlipMove from "react-flip-move";
import ModalEditVocabulary from "./ModalEditVocabulary";

class SectionVocabulary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            data: null
        };
    }

    toggleModal = (data) => {
        this.setState({
            isOpen: !this.state.isOpen,
            data
        })
    }

    renderVocabulary = () => {
        return this.props.data.map(item => {
            return (
                <div key={item.id} className="section-vocabulary__item">

                    <Vocabulary toggleModal={this.toggleModal} data={item}/>

                </div>

            )
        })
    }

    render() {
        return (
            <div>
                <div className="section-vocabulary__title">
                    TỪ VỰNG ĐÃ LƯU
                </div>
                <FlipMove enterAnimation="fade" leaveAnimation="fade" className="section-vocabulary">
                    {
                        this.renderVocabulary()
                    }
                </FlipMove>
                {
                    !!this.state.data ? <ModalEditVocabulary onClickOutside={this.toggleModal} data={this.state.data}
                                                             isOpen={this.state.isOpen}/> : null
                }

            </div>

        )
    }
}

export default SectionVocabulary