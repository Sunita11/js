import React,{PropTypes} from 'react';
import '../../src/sass/ui.scss';
import Terrain1  from 'react-icons/lib/md/terrain';
import SnowFlake1 from 'react-icons/lib/ti/weather-snow';
import Calandar1 from 'react-icons/lib/fa/calendar';

const percentToDecimal = (decimal) => ((decimal*100) + "%")

const calcGoalProgress = (total,goal) => (percentToDecimal(goal/total))


export const SkiiDayCount = ({total,powder=60,backcountry=50,goal=40}) => (
	<div className="skii-day-count">
		<div className="total-days">
			<span>{total}</span>
			<span> Days</span>
			<SnowFlake1 />
		</div>
		<div className="powder-days">
			<span>{powder}</span>
			<span> Days</span>
			<Calandar1 />
			
		</div>
		<div className="backcountry-days">
			<span>{backcountry}</span>
			<span> Days</span>
			<Terrain1 />
		</div>
		<div className="goals">
			<span>{calcGoalProgress(total,goal)}</span>
			<span> Days</span>
		</div>
	</div>
)

SkiiDayCount.propTypes = {
	total : PropTypes.number.isRequired,
	powder : PropTypes.number,
	backcountry : PropTypes.number,
	goal : PropTypes.number
}