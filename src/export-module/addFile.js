import React,{Component} from 'react'
import {render} from 'react-dom'

export class AddInput extends Component {
	getFileData (e) {
		let dataFile = document.getElementById('myFile');
		let reader = new FileReader();
		console.log('added');
		reader.onload = function(e) {
			console.log('initialized');

			var data = e.target.result();
			var workbook = XLSX.read(data,{
				type: 'binary'
			});

			workbook.SheetNames.forEach(function(sheetname){
				var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				var jsonObj = JSON.stringify(XL_row_object);
				console.log(jsonObj);
			});
		}
		reader.onError = function(){
			console.log('error');
		}
	}
	render () {
		return (<input type="file" 
					   id="myFile"
					   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
					   onChange={this.getFileData} />)
	}
}