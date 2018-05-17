/*window.jQuery = window.$ = require('jquery');
var bootstrap = require('bootstrap-sass');
var handlebar = require('handlebars');*/

/*(function($,window,document,PWP){
	PWP.project =(function(){
		function _project(){
			this.init = function(){
				initialize();
			}

			var initialize = function(name="sunita"){
				var a= name;
			}
		}
		return new _project();
	})();

	$(function() {
        PWP.project.init();
    });
})(jQuery, this, this.document, window.PWP = window.PWP || {});
*/

function component() {
	var element = document.createElement('div');
  
	// Lodash, currently included via a script, is required for this line to work
	element.innerHTML = 'Hello webpack :D';
  
	return element;
  }
  
  document.body.appendChild(component());