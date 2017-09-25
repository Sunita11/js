import React,{PropTypes} from 'react';
import {SkiiDayRow} from './skiiDayRow'

export const SkiiDayList = ({days}) => (
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Resorts</th>
				<th>Powder</th>
				<th>Backcountry</th>
			</tr>
		</thead>
		<tbody>
			{days.map((day,i) => 
					<SkiiDayRow key={i}
								{...day}
					/>
				)}
		</tbody>
	</table>
)

SkiiDayList.propTypes = {
	days : function(props) {
		if(!Array.isArray(props.days)) {
			return new Error ('SkiiDayList should be an array')
		} else if(!props.days.length) {
			return new Error ('SkiiDayList  must have at least one record');
		} else {
			return null;
		}
	}
}