import React from 'react';
import TableContent from './table-content';
import TableHeader from './table-header';
import * as style from './style.scss';

const Table = (props) => {
    const { tableHeader, tableContent, tableLabel,showCalendar, buttonIconCallBackFn,showModal} = props;
    return (
        <section>
            <table className={style.tableWrapper}>
                <TableHeader headerLabels={tableHeader} />
                <TableContent
                    contentItems={tableContent}
                    contentLabels={tableLabel}
                    showCalendar={showCalendar}
                    showModal={showModal}
                />
            </table>
        </section>

    );
};

export default Table;
