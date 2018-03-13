import Icon from '../../src/images/m1.png'
import printMe from '../../src/scripts/print.js'

function component() {
	var elem = document.createElement('div');

	elem.innerHTML = 'Hello World 1';
	var myIcon = new Image();
	myIcon.src = Icon;

	elem.appendChild(myIcon);

	var btn = document.createElement('button');
	btn.innerHTML = 'Click Me and check console';
	btn.onClick = printMe;

	elem.appendChild(btn);

	return elem;
}

document.body.appendChild(component());