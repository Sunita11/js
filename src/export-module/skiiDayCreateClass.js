import React, {createClass,PropTypes} from 'react';
import '../../src/sass/ui.scss';
import '../../src/sass/globals.scss';
import '../../src/sass/index.scss';

export const SkiiDayCount = createClass ({
	/*	SkiiDayCount.defaultProps = {
			total: 50,
			powder: 30,
			backcountry : 20,
			goal : 10
		}
	},*/
	propTypes: {
		total : PropTypes.number.isRequired,
		powder : PropTypes.number,
		backcountry : PropTypes.number
	},
	getDefaultProps(){
		return{
			powder: 30,
			backcountry : 20,
			goal : 10
		}
	},
	percentToDecimal (decimal) {
		return ((decimal*100) + "%")
	},
	calcGoalProgress(total,goal) {
		return this.percentToDecimal(goal/total)
	},
	render() {
		return (
			<div className="skii-day-count">
				<div className="total-days">
					<span>{this.props.total}</span>
					<span> Days</span>
				</div>
				<div className="powder-days">
					<span>{this.props.powder}</span>
					<span> Days</span>
				</div>
				<div className="backcountry-days">
					<span>{this.props.backcountry}</span>
					<span> Days</span>
				</div>
				<div className="goals">
					<span>{this.calcGoalProgress(this.props.total,this.props.goal)}</span>
					<span> Days</span>
				</div>
			</div>
		)
	}
})