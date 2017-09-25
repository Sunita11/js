import React,{PropTypes} from 'react';
import Terrain3 from 'react-icons/lib/md/terrain'
import SnowFlake3 from 'react-icons/lib/ti/weather-snow'
import Calendar3 from 'react-icons/lib/fa/Calendar'


export const SkiiDayRow = ({resort, date, powder, backcountry}) => (
	<tr>
		<td>
			{date}
		</td>
		<td>
			{resort}
		</td>
		<td>
			{(powder)? <SnowFlake3/> : null}
		</td>
		<td>
			{(backcountry)? <Terrain3/> : null}
		</td>
	</tr>
)

SkiiDayRow.propTypes = {
	resort : PropTypes.string.isRequired,
	date : PropTypes.string.isRequired,
	powder : PropTypes.bool,
	backcountry : PropTypes.bool
}