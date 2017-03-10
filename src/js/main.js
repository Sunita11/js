//https://scotch.io/tutorials/building-your-own-javascript-modal-plugin

//Creating IIFE to hide its global visuality

(function(){
	//making own constructor
	this.Modal = function(){
		var defaults = {
			className: "fade-and-drop",
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

		this.transitionEnd = browserSpecificTransition();
	}

	//Public  method to open the overlay
	Modal.prototype.open = function(){
		build.call(this);
		initializeEvents.call(this);
		this.addClass(this.modal,  "modal-open");
		this.addClass(this.overlay,  "overlay-open");
	}

	Modal.prototype.close = function() {
		var _this = this;

		_this.removeClass(_this.modal, "modal-open");
		_this.removeClass(_this.overlay, "overlay-open");

		_this.modal.addEventListener(this.transitionEnd, function(){
			_this.modal.parentnode.removeChild(_this.modal);
		});

		_this.overlay.addEventListener(this.transitionEnd, function(){
			if(_this.overlay.parentnode) {
				_this.overlay.parentnode.removeChild(_this.overlay);
			}
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
		this.addClass(this.modal, this.options.className + " modal");

		//If close button option is true
		if(this.options.closeButton === true) {
			var closeButton = document.createElement("button");
			closeButton.innerHTML = "X";
			this.addClass(closeButton, "modal-close modal-close-btn");
			this.modal.appendChild(closeButton);
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

var myModal = new Modal();
var btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", function(){
	myModal.open();
});
