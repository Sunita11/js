import React,{PropTypes} from 'react';

export const AddDayForm = ({ resort, date,powder,backcountry,OnNewDay}) => {

	let _resort,
		_date,
		_powder,
		_backcountry;

	const submit = (e) => {
		e.preventDefault();
		OnNewDay({
			resort : _resort.value,
			date : _date.value,
			powder : _powder.checked,
			backcountry : _backcountry.checked
		})
		
		_resort.value = ''
		_date.value = ''
		_powder.checked = false
		_backcountry.checked = false
	}

	return (
		<form onSubmit = {submit} className="add-day-form">
			<div>
				<label htmlFor="resort"> Resort: </label>
				<input id="resort"
					   type="text"
					   required 
					   defaultValue = {resort}
					   ref={input => _resort = input}/>
			</div>

			<div>
				<label htmlFor="date"> Date: </label>
				<input id="date"
					   type="text" 
					   required 
					   defaultValue = {date}
					   ref={input => _date = input}/>
			</div>

			<div>
				<input id="powder" 
					   type="checkbox"
					   required
					   defaultChecked = {powder}
					   ref={input => _powder = input}/>
				<label htmlFor="powder"> Powder Day: </label>
			</div>

			<div>
				<input id="backcountry"
					   type="checkbox" 
					   required
					   defaultChecked = {backcountry}
					   ref={input => _backcountry = input}/>
				<label htmlFor="backcountry">Backcountry Day: </label>
			</div>
			<button type="submit">Add a Day </button>
		</form>
	)
}

AddDayForm.defaultProps = {
	resort: "Kirkwood",
	date: "2017-12-14",
	powder: true,
	backcountry: false
}

AddDayForm.propTypes = {
	resort: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	powder: PropTypes.bool,
	backcountry: PropTypes.bool
}