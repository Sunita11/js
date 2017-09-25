import React,{Component}  from 'react';
import '../../src/sass/ui.scss';
import '../../src/sass/globals.scss';
import '../../src/sass/index.scss';
import Terrain2 from 'react-icons/lib/md/terrain'
import SnowFlake2 from 'react-icons/lib/ti/weather-snow'
import Calendar2 from 'react-icons/lib/fa/Calendar'

export class SkiiDayCount extends Component {
	percentToDecimal (decimal) {
		return ((decimal*100) + "%")
	}
	calcGoalProgress(total,goal) {
		return this.percentToDecimal(goal/total)
	}
	render() {
		return (
			<div className="skii-day-count">
				<div className="total-days">
					<span>{this.props.total}</span>
					<span> Days</span>
					<Calendar2/>
				</div>
				<div className="powder-days">
					<span>{this.props.powder}</span>
					<span> Days</span>
					<SnowFlake2/>
				</div>
				<div className="backcountry-days">
					<span>{this.props.backcountry}</span>
					<span> Days</span>
					<Terrain2/>
				</div>
				<div className="goals">
					<span>{this.calcGoalProgress(this.props.total,this.props.goal)}</span>
					<span> Days</span>
				</div>
			</div>
		)
	}
}