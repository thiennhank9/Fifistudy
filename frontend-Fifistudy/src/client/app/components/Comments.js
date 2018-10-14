import React from "react";
import Comment from "./Comment";
import FlipMove from "react-flip-move";


class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderComment = () => {
        return this.props.data.map(item => {
            return (<Comment key={item.id} data={item}>

            </Comment>)
        })
    }
    //
    // onTextareaChange = (evt) => {
    //     this.setState({
    //         comment: evt.target.value
    //     })
    // }
    //
    // onTextareaKeyPress = (evt) => {
    //     console.log(this.props.data)
    //     if (evt.charCode == 13) {
    //         if (!validator.isEmpty(this.state.comment)) {
    //             let data = {
    //                 content: this.state.comment,
    //                 film_id: this.props.data.id
    //             }
    //             let {cookies} = this.props;
    //             postComment(data, cookies.get("token")).then(res => {
    //                 console.log(res)
    //                 if (res.data.errors === null) {
    //                     alert('Comment thanh cong')
    //                     //Cap nhat lai comment o day
    //                 }
    //                 else {
    //                     alert('Comment that bai')
    //                 }
    //             });
    //
    //         }
    //         else {
    //             alert('Vui lòng nhạp nội dung')
    //         }
    //
    //     }
    //
    // }
    //
    // onTextareaFocus = (e) => {
    //
    //     if (this.props.isLogin) {
    //         return
    //     }
    //     this.props.toggleModalLogin();
    // }


    render() {
        return (
            <div>
                <FlipMove enterAnimation="fade" leaveAnimation="fade">
                    {
                        this.renderComment()
                    }
                </FlipMove>

            </div>

        )
    }
}

export default Comments