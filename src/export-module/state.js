import React,{createClass} from 'react'
import {SkiiDayList} from './skiiDayList'
import {SkiiDayCount} from './skiiDayCount'
import {AddDayForm} from '../../src/export-module/addDayForm'
import {Menu} from '../../src/export-module/menu'

export const App = createClass ({
	getInitialState(){
		return {
			allSkiDay : [
				{
					resort: "Squaw Valley",
					date : "1/2/2016",
					powder: true,
					backcountry: false
				}
			]
		}

		this.addDay = this.addDay.bind(this)

	},

	addDay(newDay) {
		this.setState({
			allSkiDay : [
				...this.state.allSkiDay,
				newDay
			]
		})
	},

	countDays(filter){
		return this.state.allSkiDay.filter((day)  => (filter)? day[filter] : day).length
	},
	render (){
		return (
			<div className="app">
				<Menu />
				{(this.props.location.pathname==='/add-day') ? 
				<AddDayForm resort= {"Kirkwoodgf"}
							date= {"2017-12-14"}
							powder= {true}
							backcountry= {false}
							OnNewDay= {this.addDay}/> : (this.props.location.pathname==='/') ? <SkiiDayCount total={this.countDays()} 
								  powder={this.countDays('powder')}
								  backcountry={this.countDays('backcountry')} /> : 
				 
				 <SkiiDayList days = {this.state.allSkiDay} />
				}
			</div>
		)
	}
})