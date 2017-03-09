//https://scotch.io/tutorials/building-your-own-javascript-modal-plugin

//Creating IIFE to hide its global visuality

(function(){
	//making own constructor
	this.Modal = function(){
		var defaults = {
			className: "fade-and-drop",
			content: "",
			maxWidth: 600,
			minWidth: 300,
			closeButton: true,
			overlay: true
		}


		//create default options by extending them with the passed arguments

		if(arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults , arguments[0]);
			console.log(this.options);
		}

		this.transitionEnd = browserSpecificTransition();
	}

	//Public  method to open the overlay
	Modal.prototype.open = function(){
		build.call(this);
		initializeEvents.call(this);
		this.overlay.className = this.options.className + " opened";
	}

	Modal.prototype.close = function() {
		var _this = this;
		_this.modal.className.replace("modal ", "");
		_this.overlay.className.replace("opened", "");

		_this.modal.addEventListener(this.transitionEnd, function(){
			_this.modal.parentnode.removeChild(_this.modal);
		});

		_this.overlay.addEventListener(this.transitionEnd, function(){
			if(_this.overlay.parentnode) {
				_this.overlay.parentnode.removeChild(_this.overlay);
			}
		});
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
			var overlay = document.createElement("div");
			ovelay.className = "modal-overlay ";
			docFrag.appendChild(overlay);
		}


		//creating content holder and attaching it to this.modal
		this.modal = document.createElement("div");
		this.modal.className = "modal " + this.options.className;
		this.modal.minWidth = this.options.minWidth + "px";
		this.moda.maxWidth = this.options.maxWidth + "px";

		//If close button option is true
		if(this.options.closeButton === true) {
			var closeButton = document.createElement("button");
			closeButton.className = "modal-close modal-close-btn";
			closeButton.innerHTML = "X";
			this.modal.appendChild(closeButton);
		}

		//Create content area
		contentHolder = document.createElement("div");
		contentHolder.className = "modal-content";
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		//Append modal to docFrag
		docFrag.appendChild(this.modal);

		//Append docFrag to body
		document.body.appendChild(docFrag);

	}


	//adding eventListeners
	function initializeEvents(){
		if(this.closeButton) {
			this.closeButton.addEventListener('click', this.close.bind(this));
		}

		if(this.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
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
