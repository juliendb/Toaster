/**
 * Plugin Toaster
 */
var Toaster = function(options) {
	/**
	 * define private properties and methods
	 */

	var timerRestart,
		timerBegin,
	 	timerLeave,
	 	timerHide;

	var isBuild = false;


	var toaster = $('<div class="toaster"></div>'),
		close = $('<div class="toaster-close">&#10005,</div>'),
		title = $('<div class="toaster-title"></div>'),
		content = $('<div class="toaster-content"></div>');


	var defaults = {
		container: "body",
		title: "",
		content: "",
		classe: "",
		id: "",
		showMethod: "fade",
		hideMethod: "fade",
		position: "bottom-left",
		timeShow: 600,
		timeHide: 600,
		timeBegin: 2000,
		timeRemnant: 20000,
		timeRestart: 5000,
		begin: true,
		close: true,
		restart: true
	}


	var rules = {
		container: "content",
		title: "content",
		content: "content",
		classe: "string",
		id: "string",
		showMethod: "method",
		hideMethod: "method",
		position: "position",
		timeShow: "integer",
		timeHide: "integer",
		timeBegin: "integer",
		timeRemnant: "integer",
		timeRestart: "integer",
		begin: "boolean",
		close: "boolean",
		restart: "boolean"
	};


	function error(message) {
		console.log("Toaster Error - "+message);
	}


	// check options rules
	function checkOptions() {
		var methods = {
			string: function(val) { return typeof(val) === "string" },
			boolean: function(val) { return typeof(val) === "boolean" },
			content: function(val) { return typeof(val) === "string" || typeof(val) === "object" || typeof(val) === "number" },
			integer: function(val) { return /^\d+$/.test(val) && typeof(val) === "number"; },
			method: function(val) { return /^(fade|scale|slideLeft|slideRight|slideUp|slideDown)$/.test(val); },
			position: function(val) { return /^(top-left|top-right|bottom-left|bottom-right)$/.test(val); }
		}


		$.each(API.options, function(name, value) {
			if (rules.hasOwnProperty(name)) {
				var rule = rules[name];
				if (!methods[rule](value)) {
					API.options[name] = defaults[name];

					error("The value of the parameter (\""+name+"\") is invalid, the default value ("+defaults[name]+") was chosen instead !");
				}
			}
		});


		return API.options;
	}


	function clearTimers() {
		clearTimeout(timerRestart);
		clearTimeout(timerBegin);
		clearTimeout(timerLeave);
		clearTimeout(timerHide);
	}


	function getOptions() {
		if (!jQuery.isEmptyObject(options)) API.options = options;
		API.options = $.extend({}, defaults, API.options);
		return checkOptions();
	}


	function maxDuration(number) {
		// limit duration and delay
		return number >= 2147483647 ? 2147483647 : number;
	}


	function animation(method, duration) {
		switch(method) {
			case "fadeIn" :
				toaster.css({opacity: 0});
				toaster.transition({opacity: 1, duration: duration});
				break;
			case "fadeOut" :
				toaster.transition({opacity: 0, duration: duration});
				break;

			case "scaleIn" :
				toaster.css({opacity: 0, scale: 0});
				toaster.transition({opacity: 1, scale: 1, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;
			case "scaleOut" :
				toaster.css({scale: 1});
				toaster.transition({opacity: 1, scale: 0, duration: duration});
				break;

			case "slideLeftIn" :
				toaster.css({x: "-200%", opacity: 0});
				toaster.transition({x: 0, opacity: 1, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;
			case "slideLeftOut" :
				toaster.transition({x: "-200%", opacity: 0, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;

			case "slideRightIn" :
				toaster.css({x: "200%", opacity: 0});
				toaster.transition({x: 0, opacity: 1, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;
			case "slideRightOut" :
				toaster.transition({x: "200%", opacity: 0, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;

			case "slideUpIn" :
				toaster.css({y: "-200%", opacity: 0});
				toaster.transition({y: 0, opacity: 1, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;
			case "slideUpOut" :
				toaster.transition({y: "-200%", opacity: 0, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;

			case "slideDownIn" :
				toaster.css({y: "200%", opacity: 0});
				toaster.transition({y: 0, opacity: 1, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;
			case "slideDownOut" :
				toaster.transition({y: "200%", opacity: 0, duration: duration, easing: 'cubic-bezier(.75,-0.5,0,1.75)'});
				break;
		}
	}


	/**
	 * define public properties and methods
	 */
	var API = {
		options: {},
		remove: remove,
		build: build,
		clear: clear,
		show: show,
		hide: hide,
	}

	return API;


	function build() {
		var options = getOptions();


		API.remove();


		isBuild = true;


		toaster = $('<div class="toaster"></div>');
		close = $('<div class="toaster-close">&#10005;</div>');
		title = $('<div class="toaster-title"></div>');
		content = $('<div class="toaster-content"></div>');

		// create toaster element
		toaster.empty().addClass(options.position).addClass(options.classe).attr("id", options.id);

		// close button
		if (options.close == true) {
			toaster.append(close);
		}

		// title & content
		if (options.title) {
			title.html(options.title);
			toaster.append(title);
		}
		if (options.content) {
			content.html(options.content);
			toaster.append(content);
		}

		// add to view to container
		toaster.appendTo($(options.container)).toggle(false);

		// close to hide
		close.off("click", hide).on("click", API.hide);

		if (options.begin) {
			timerBegin = setTimeout(API.show, maxDuration(options.timeBegin));
		}


		return API;
	}


	function clear() {
		var options = getOptions();

		// can't use if not build
		if (isBuild) {
			clearTimers()

			// hide methods animation
			animation(options.hideMethod+"Out", maxDuration(options.timeHide));
		
		} else {
			error("This action don't work because the Toaster is not build.");
		}


		return API;
	}


	function show() {
		var options = getOptions();
		
		// can't use if not build
		if (isBuild) {
			clearTimers();

			toaster.toggle(true);

			// show methods animation
			animation(options.showMethod+"In", maxDuration(options.timeShow));

			// time leave
			timerLeave = setTimeout(API.hide, maxDuration(options.timeRemnant + options.timeShow));
		
		} else {
			error("This action don't work because the Toaster is not build.");
		}


		return API;
	}


	function hide() {
		var options = getOptions();
		
		// can't use if not build
		if (isBuild) {
			clearTimers();

			// hide methods animation
			animation(options.hideMethod+"Out", maxDuration(options.timeHide));

			timerHide = setTimeout(function() {
				toaster.toggle(false);
				
				// restart after hide if true
				if (options.restart) {
					timerRestart = setTimeout(API.show, maxDuration(options.timeRestart));
				}

			}, options.timeHide);	
		
		} else {
			error("This action don't work because the Toaster is not build.");
		}


		return API;
	}


	function remove() {
		clearTimers();

		toaster.remove();
		isBuild = false;


		return API;
	}
};