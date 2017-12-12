import React,{Component} from 'react'
import {render} from 'react-dom'

export const AddInput = () => {
	let dataFile,
		reader,
		resultArr;


	const readFileData = (e) => {
		let data = e.target.result;
		if(data.trim() === '') {
			console.log('upload unsuccessfull');
			document.getElementById('myFile').value = '';
			return;
		} else {
			let rowsArr = data.split('\n');
			for(let j=0;j<rowsArr.length;j++) {
				rowsArr[j] = rowsArr[j].split(',');
			}
			resultArr = rowsArr;
			checkForErrors();
		}
	}

	const errorCallback = () => {
		console.log('error');
	}

	const checkForErrors = () => {
		let errorFlag = false,
			counter = 0,
			rowLength = resultArr.length,
			colLength,
			pattern = /[a-zA-Z0-9]+\s*$/;
		for(let i =0; i<rowLength; i++) {
			colLength = resultArr[i].length;
			for(let j=0;j<colLength;j++) {
				if(resultArr[i][j] === '' || !(pattern.test(resultArr[i][j].trim()))) {
					errorFlag = true;
				}
			}
			counter = (errorFlag) ? ++counter : counter;
			errorFlag = false;
		}
		console.log(counter);
	}

	const getFileData = () => {
		dataFile = document.getElementById('myFile');
        console.log(dataFile.files[0]);
		if((dataFile.files[0].type === 'text/csv') || (dataFile.files[0].type === '.csv') || (dataFile.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (dataFile.files[0].type === 'application/vnd.ms-excel')) {
            console.log('inside if');
			reader = new FileReader();
			reader.onload = readFileData;
			reader.onerror = errorCallback;
			reader.readAsText(dataFile.files[0]);
		}
		else {
			console.log('upload unsuccessfull due to unsupported format');
			document.getElementById('myFile').value = '';
			document.getElementById('errorMsg').innerHTML = 'upload unsuccessfull due to unsupported format';
		}
	}

	return (<input type="file" 
					id="myFile" 
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					onChange={getFileData} />);
}
