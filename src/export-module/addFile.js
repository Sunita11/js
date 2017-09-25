import React,{Component} from 'react'
import {render} from 'react-dom'

export class AddInput extends Component {
	getFileData () {
		let dataFile = document.getElementById('myFile');
		if('files' in dataFile ) {
			if(dataFile.files.length !== 0) {
				console.log(dataFile.files[0]);
			}
		}
	}
	render () {
		return (<input type="file" 
					   id="myFile"
					   accept
					   onChange={this.getFileData} />)
	}
}