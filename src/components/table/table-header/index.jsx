import React from 'react';
import * as style from '../style.scss';

const TableHeader = (props) => {
    const { headerLabels } = props;
    return (
        <thead className={style.tableHeader}>
            {
                headerLabels && headerLabels.map((headerName, index) => {
                    return (
                        <th key={index} className={style.tableHeaderItem}>
                            {headerName}
                        </th>);
                })
            }
        </thead>
    );
};
export default TableHeader;
