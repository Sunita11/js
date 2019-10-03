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
import './../sass/import-sass-files.scss';
import './materialize.min.js';

const project = (function(){

	function loadContent () {
		console.log('loadContent');
		const menus = document.querySelectorAll('.side-menu');
		M.Sidenav.init(menus, {edge: 'right'});

		const forms = document.querySelectorAll('.side-form');
		M.Sidenav.init(forms, {edge: 'left'});
	}

    function init () {
		console.log('init');
		document.addEventListener('DOMContentLoaded',loadContent);
    }
    

    function publicMethod(){
        init();
    }
    return {
        publicMethod: publicMethod
    };
})();

project.publicMethod();