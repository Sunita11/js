import Icon from '../../src/images/m1.png'
import printMe from './print.js'
import { cube } from './math.js'

function component() {
	var elem = document.createElement('pre');

	elem.innerHTML = [
			'Hello Webpack!',
			'5 cubed is equal to ' + cube(5)
		].join('\n\n');
	var myIcon = new Image();
	myIcon.src = Icon;

	elem.appendChild(myIcon);

	var btn = document.createElement('button');
	btn.innerHTML = 'Click Me and check console';
	btn.onclick = printMe;

	elem.appendChild(btn);

	return elem;
}

//document.body.appendChild(component());
let element = component();

document.body.appendChild(element);

if(module.hot) {
	module.hot.accept('./print.js', function() {
		console.log('Accepting the updated printMe module');
		prentMe();
	})
}