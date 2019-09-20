import React from 'react';
import * as style from './style.css';


const Modal = (props) => {
    const { data, onClose, visible} = props;
    const { item} = data;
    return (
        <section className={style.overlay} onClick={onClose}>
            <div className={style.content}>
                <div className={style.showList}>
                    <span>Date</span>
                    <p>
                        <span>{item.date}</span>
                        <span>{data.diffDays}</span>
                    </p>
                </div>
                <div className={style.showList}>
                    <span>Campaign</span>
                    <div>
                        <span className={`${style.iconWrapper} ${style.floatLeftImg}`}><img src={item.imgSrc} alt={item.imgName}/></span>
                        <div>{item.title}</div>
                        <div className={style.lessFontSize}>{item.country}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Modal;