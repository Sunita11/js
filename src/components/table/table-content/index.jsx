import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as style from './../style.scss';

const dateCol = (detail) => {
    const todayDate = new Date();
    const timeStamp = todayDate.getTime();
    const campaingTime = new Date(detail.date).getTime();
    let diff =  (timeStamp - campaingTime)/(1000 * 3600 * 24);
    let timeString = '';
    diff = parseInt(''+diff, 10);
    if(diff<0){
        timeString = ' days ago';
        return (Math.abs(diff) + timeString);
    }else if(diff>0) {
        timeString = ' days ahead'
        return (Math.abs(diff) + timeString);
    }
    
    return '';
}


const getTableContent = (props) => {
    const { contentItems, showCalendar, detailId, showModal } = props;
    let rows = [];
    rows = contentItems && contentItems.map((item, contentIndex) => {
        const index = detailId ? item[detailId] : contentIndex;
        const detailedObj = {
            item,
            daysDiff: dateCol(item),
            index,
        };
        return (
            <tr
                key={index}
                onClick={()=>{showModal(detailedObj)}}
            >
            <td>
                <div>{item.date}</div>
                <div className={style.lessFontSize}>{dateCol(item)}</div>
            </td>
            <td>
                <span className={`${style.iconWrapper} ${style.floatLeftImg}`}><img src={item.imgSrc} alt={item.imgName}/></span>
                <span>{item.title}</span>
                <p className={style.lessFontSize}>{item.country}</p>
            </td>
            <td>
                <div className={style.iconWrapperDollar}><img src={item.viewImg}/></div>
                <p className={style.lessFontSize}>View</p>
                <p className={style.lessFontSize}>Prong</p>
            </td>
            <td>
                <span className={`${style.iconWrapper} ${style.lessFontSize}`}><img src={item.fileIcon}   alt='file icon'/>file</span>
                <span className={`${style.iconWrapper} ${style.lessFontSize}`}><img src={item.signalIcon}  alt='signal icon'/></span>
                <span className={`${style.iconWrapper} ${style.lessFontSize}`}><img src={item.calenderIcon}  alt='file icon' onClick={showCalendar}/>Schedule Again <div className={`calendar-wrapper`}>{/* <Calendar value={new Date()}/> */}</div></span>
            </td>

            </tr>);
    });

    return rows.length > 0 && rows;
};

const TableContent = (props) => {
    return (
        <tbody>
            {getTableContent(props)}
        </tbody>
    );
};

export default TableContent;
