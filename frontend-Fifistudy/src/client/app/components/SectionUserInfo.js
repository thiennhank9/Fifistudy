import React from "react";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import Input1 from "./Input1";
import {withCookies} from "react-cookie";
import {SERVER_ERRORS} from "../constants/serverErrors";
import {postUpdateUserInfo} from "../actions/api";
import {getUserInfo} from "../actions/app";

class SectionUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.data, ...{birthday: this.props.birthday ? moment(this.props.data.birthday, "YYYY-MM-DD") : moment()},
            serverErrors: []
        }
    }

    onTextInputChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onClickSave = () => {
        let {cookies} = this.props;
        let token = cookies.get("token")
        let data =
            {
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "gender": parseInt(this.state.gender),
                "phone": this.state.phone,
                "birthday": `${this.state.birthday.year()}-${this.state.birthday.month() + 1}-${this.state.birthday.date()}`,
                "address": this.state.address
            }
        // let el = evt.target;
        let headers = {headers: {Authorization: `Token ${token}`}}
        postUpdateUserInfo(data, headers)
            .then(res => {
                if (res.data.errors) {
                    let errors = res.data.errors.map(item => {
                        return SERVER_ERRORS[item.errorCode]
                    });
                    this.setState({
                        serverErrors: errors,
                        // disableNextThree: true,
                    })
                }
                else {
                    // Thanh cong
                    // alert('Cập nhật thành công')
                    this.setState({
                        // disableNextThree: false,
                        serverErrors: [],
                    });
                    this.props.getUserInfo(token);
                    // this.animateNext(el);
                }
            })
    }

    renderErrors = () => {
        return this.state.serverErrors.map(item => {
            return <div className="section-user-info__err">
                {item}
            </div>
        })
    }

    handleChange = value => {
        this.setState({
            birthday: value
        })
    }

    render() {
        let {state} = this;
        return (
            <div>
                <div className="section-vocabulary__title">
                    THÔNG TIN CÁ NHÂN
                </div>
                <div className="section-user-info">
                    <div className="section-user-info__row">
                        <div className="section-user-info__item section-user-info__item--first-name">
                            <Input1 name="first_name" onChange={this.onTextInputChange} value={state.first_name}
                                    label="HỌ"/>
                        </div>
                        <div className="section-user-info__item section-user-info__item--last-name">
                            <Input1 name="last_name" onChange={this.onTextInputChange} value={state.last_name}
                                    label="TÊN"/>
                        </div>
                    </div>
                    <div className="section-user-info__row">
                        <Input1 disabled name="email" onChange={this.onTextInputChange} value={state.email}
                                label="EMAIL"/>
                    </div>
                    <div className="section-user-info__row">
                        <Input1 name="password" onChange={this.onTextInputChange} label="MẬT KHẨU"/>
                    </div>
                    <div className="section-user-info__row">
                        <div className="user-input__label">
                            GIỚI TÍNH
                        </div>

                        <label className="user-input__label user-input__label--radio"><input
                            onChange={this.onTextInputChange} value="1" type="radio"
                            className="radio" name="gender"
                            checked={state.gender == 1}/>Nam</label>
                        <label className="user-input__label user-input__label--radio"><input
                            onChange={this.onTextInputChange} value="0" type="radio"
                            className="radio" name="gender"
                            checked={state.gender == 0}/>Nữ</label>

                    </div>
                    <div className="section-user-info__row">
                        <Input1 name="phone" onChange={this.onTextInputChange} value={state.phone} label="SĐT"/>
                    </div>
                    <div className="section-user-info__row">
                        <div className="user-input">

                            <label className="user-input__label">SINH NHẬT</label>
                            <DatePicker
                                className="user-input__input"
                                selected={this.state.birthday}
                                onChange={this.handleChange}
                                dateFormat="DD-MM-YYYY"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />

                        </div>

                        {/*<Input1 name="birthday" onChange={this.onTextInputChange} value={state.birthday}*/}
                        label="NGÀY SINH"/>
                    </div>
                    <div className="section-user-info__row">
                        <Input1 name="address" onChange={this.onTextInputChange} value={state.address} label="ĐỊA CHỈ"/>
                    </div>
                    <div className="section-user-info__row section-user-info__row--end">
                        {
                            this.renderErrors()
                        }
                    </div>
                    <div className="section-user-info__row section-user-info__row--end">
                        <div onClick={this.onClickSave} className="section-user-info__btn">
                            Lưu
                        </div>
                    </div>


                </div>
            </div>

        )
    }
}

export default connect(null, {getUserInfo})(withCookies(SectionUserInfo))