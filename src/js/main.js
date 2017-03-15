//https://scotch.io/tutorials/building-your-own-javascript-modal-plugin

//Creating IIFE to hide its global visuality

(function(){
	//making own constructor
	this.Modal = function(){

		this.modal = null;
		this.overlay = null;
		this.closeButton = null;

		this.transitionEnd = browserSpecificTransition();
		var defaults = {
			content: "This is modal window",
			maxWidth: 600,
			minWidth: 300,
			closeButton: true,
			overlay: true
		}


		//create default options by extending them with the passed arguments

		if(arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults , arguments[0]);
		}else {
			this.options = defaults;
		}		
	}

	//Public  method to open the overlay
	Modal.prototype.open = function(){
		var modalclassName;

		build.call(this);
		initializeEvents.call(this);

		modalclassName = (this.modal.offsetHeight > window.innerHeight ?
		" modal-open modal-anchored" : " modal-open");
		this.addClass(this.modal,  modalclassName);
		this.addClass(this.overlay,  "overlay-open");	
	}

	Modal.prototype.close = function() {
		var _this = this;

		_this.removeClass(_this.modal, "modal-open");

		if(_this.modal.classList.contains("modal-anchored")) {
			_this.removeClass(_this.modal, "modal-anchored");
		}

		_this.removeClass(_this.overlay, "overlay-open");

		_this.modal.addEventListener(this.transitionEnd, function(){
			_this.modal.parentNode.removeChild(_this.modal);
			_this.overlay.parentNode.removeChild(_this.overlay);
		});
	}

	Modal.prototype.removeClass = function(el, classname) {
		var classname = classname.replace(/\s/g,"");
		if(el.classList && el.classList.contains(classname)) {
			el.classList.remove(classname);
		}
	}


	//add one or more class at a time
	Modal.prototype.addClass = function(el,classname){
		var classname = classname.replace(/^\s+|\s+$/g, '');
		if(classname.indexOf(" ") > 0) {
			var arrayOfClasses = classname.split(" ");
			for (var i =0;i<arrayOfClasses.length;i++) {
				if(el.classList && !el.classList.contains(arrayOfClasses[i])){
					el.classList.add(arrayOfClasses[i]);
				}else {
					el.className += arrayOfClasses[i];
				}
			}
		}else {
			if(el.classList && !el.classList.contains(classname)){
				el.classList.add(classname);
			}else {
				el.className += classname;
			}
		}
	}

	
	//function to build modal window fragment

	function build(){
		var content,
			contentHolder,
			docFrag;

		if(typeof this.options.content === "string") {
			content = this.options.content;

		}else{
			content = "Lorem Ipsum";
		}

		docFrag = document.createDocumentFragment();

		//creating overlay and appending to docFrag
		if(this.options.overlay === true) {
			this.overlay = document.createElement("div");
			this.addClass(this.overlay, "modal-overlay");
			docFrag.appendChild(this.overlay);
		}


		//creating content holder and attaching it to this.modal
		this.modal = document.createElement("div");
		this.modal.style.minWidth = this.options.minWidth + "px";
		this.modal.style.maxWidth = this.options.maxWidth + "px";
		this.addClass(this.modal, "modal ");

		//If close button option is true
		if(this.options.closeButton === true) {
			this.closeButton = document.createElement("button");
			this.closeButton.innerHTML = "X";
			this.addClass(this.closeButton, "modal-close modal-close-btn");
			this.modal.appendChild(this.closeButton);
		}

		//Create content area
		contentHolder = document.createElement("div");
		contentHolder.innerHTML = content;
		this.addClass(contentHolder, "modal-content");
		this.modal.appendChild(contentHolder);

		//Append modal to docFrag
		docFrag.appendChild(this.modal);

		//Append docFrag to body
		document.body.appendChild(docFrag);

	}

	//Private utility method to extend the default options
	function extendDefaults(source, properties) {
		var property;

		for(property in properties) {
			if(properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}

		return source;
	}

	//adding eventListeners
	function initializeEvents(){
		if(this.options.closeButton) {
			var closeBtnNode = document.getElementsByClassName("modal-close-btn")[0];
			closeBtnNode.addEventListener('click', this.close.bind(this));
		}

		if(this.options.overlay) {
			var overlayNode = document.getElementsByClassName("modal-overlay")[0];
			overlayNode.addEventListener('click', this.close.bind(this));
		}
	}


	//utility function to get browser specific transition
	function browserSpecificTransition() {
		var el = document.createElement("div");
		if(el.style.WebkitTransition) return "webkitTransitionEnd";
		if(el.style.OTransition) return "oTransitionEnd";
		return "transitionend";
	}
})();

var myModal = new Modal({
 content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
});


var btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", function(){
	myModal.open();
});
window.addEventListener("keyup", function(event){
	if(event.keyCode === 32) {
		event.preventDefault();
	}
});
