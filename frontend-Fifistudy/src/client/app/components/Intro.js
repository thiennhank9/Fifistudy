import React from "react";

function Intro() {
    return (
        <div className="intro">
            <div className="intro__slogan container">
                <span className="intro__name">FifiStudy</span>
                &nbsp;- Nơi giải trí cũng là học tập
            </div>
            <div className="divider"></div>
            <div className="container intro__wrap">
                <div className="intro__item">
                    <div className="intro__icon">
                        <i className="material-icons">headset</i>
                    </div>
                    <div className="intro__title">
                        Chế độ luyện nghe hiệu quả
                    </div>
                    <div className="intro__description">
                        Cung cấp chế độ luyện nghe tiếng anh qua phim riêng biệt cho người học, nâng cao khả năng nghe
                        cực
                        kỳ hiệu quả mà chưa có phương pháp luyện nghe tiếng anh nào làm được.
                    </div>
                </div>
                <div className="intro__item">
                    <div className="intro__icon">
                        <i className="material-icons">book</i>
                    </div>
                    <div className="intro__title">
                        Nâng cao vốn từ vựng tiếng Anh
                    </div>
                    <div className="intro__description">
                        Gia tăng vốn từ tiếng Anh và ghi nhớ lâu hơn với việc học từ vựng theo ngữ cảnh. Việc ghi nhớ từ
                        vựng đã lưu theo ngữ cảnh phim giúp việc học của bạn chưa bao giờ dễ daàng hơn.
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}
export default Intro