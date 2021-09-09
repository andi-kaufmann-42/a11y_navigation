//based on https://www.w3.org/WAI/tutorials/menus/application-menus-code/#nav

let menuItems = document.querySelectorAll('.navigation > li');
let subMenuItems1 = document.querySelectorAll('.navigation > li li');
let subMenuItems2 = document.querySelectorAll('.navigation > li li li');

let keys = {
	tab:    9,
	enter:  13,
	esc:    27,
	space:  32,
	left:   37,
	up:     38,
	right:  39,
	down:   40
};

let currentIndex;
let subIndex;

//top level menu
let gotoIndex = function(idx) {
    //at the end of the list set index to 0
    if (idx === menuItems.length) {
		idx = 0;
	} else if (idx < 0) {
		idx = menuItems.length - 1;
	}
	menuItems[idx].focus();
	currentIndex = idx;
    console.log("currentIndex: " + currentIndex);
};

// 1. sub level menu
let gotoSubIndex = function (menu, idx) {
    //we should check here if there is a subMenu. logs errors when no subMenu is present
    let items = menu.querySelectorAll('li');
    if (idx == items.length) {
		idx = 0;
	} else if (idx < 0) {
		idx = items.length - 1;
	}
	items[idx].focus();
	subIndex = idx;
    console.log("subIndex: " + subIndex);
}

// 2. sub level menu
let gotoSubIndex = function (menu, idx) {
    //we should check here if there is a subMenu. logs errors when no subMenu is present
    let items = menu2.querySelectorAll('li');
    if (idx == items.length) {
		idx = 0;
	} else if (idx < 0) {
		idx = items.length - 1;
	}
	items[idx].focus();
	subIndex = idx;
    console.log("subIndex: " + subIndex);
}

//top level menu
Array.prototype.forEach.call(menuItems, function(el, i){
		if (0 == i) {
			el.setAttribute('tabindex', '0');
			el.addEventListener("focus", function() {
				currentIndex = 0;
			});
		} else {
			el.setAttribute('tabindex', '-1');
		}
		el.addEventListener("focus", function() {
			subIndex = 0;
			Array.prototype.forEach.call(menuItems, function(el, i){
				el.setAttribute('aria-expanded', "false");
			});
		});
		el.addEventListener("click",  function(event){
			if (this.getAttribute('aria-expanded') == 'false' || this.getAttribute('aria-expanded') ==  null) {
				this.setAttribute('aria-expanded', "true");
			} else {
				this.setAttribute('aria-expanded', "false");
			}
			event.preventDefault();
			return false;
		});
		el.addEventListener("keydown", function(event) {
			var prevdef = false;
			switch (event.keyCode) {
				case keys.tab:
					if (event.shiftKey) {
						gotoIndex(currentIndex - 1);
					} else {
						gotoIndex(currentIndex + 1);
					}
					prevdef = true;
					break;
                case keys.enter:
                case keys.down:
                case keys.space:
                    this.click();
                    subindex = 0;
                    gotoSubIndex(this.querySelector('ul'), 0);
                    prevdef = true;
                    break;
                case keys.esc:
                    prevdef = true;
                case keys.left:
                    gotoIndex(currentIndex - 1);
                    prevdef = true;
                    break;
                case keys.up:
                    this.click();
                    var submenu = this.querySelector('ul');
                    subindex = submenu.querySelectorAll('li').length - 1;
                    gotoSubIndex(submenu, subindex);
                    prevdef = true;
                    break;
                case keys.right:
					gotoIndex(currentIndex + 1);
					prevdef = true;
					break;
			}
			if (prevdef) {
				event.preventDefault();
			}
		});
});

// 1. sub level menu 
Array.prototype.forEach.call(subMenuItems1, function(el, i){
	el.setAttribute('tabindex', '-1');
	el.addEventListener("keydown", function(event) {
			switch (event.keyCode) {
				case keys.tab:
                    if (event.shiftKey) {
						gotoSubIndex(this.parentNode, subIndex - 1);
					} else {
						gotoSubIndex(this.parentNode, subIndex + 1);
					}
					prevdef = true;
					break;
                case keys.esc:
                    gotoIndex(currentIndex);
                    prevdef = true;
                    break;
                case keys.left:
                    gotoIndex(currentIndex - 1);
                    prevdef = true;
                    break;
                case keys.up:
					gotoSubIndex(this.parentNode, subIndex - 1);
					prevdef = true;
					break;
				case keys.right:
					gotoIndex(currentIndex + 1);
					prevdef = true;
					break;
				case keys.down:
					gotoSubIndex(this.parentNode, subIndex + 1);
					prevdef = true;
					break;
			}
			if (prevdef) {
				event.preventDefault();
				//don't let the click "bubble up"
				event.stopPropagation();
			}
			return false;
	});
});

// 2. sub level menu 
Array.prototype.forEach.call(subMenuItems2, function(el, i){
	el.setAttribute('tabindex', '-1');
	el.addEventListener("keydown", function(event) {
			switch (event.keyCode) {
				case keys.tab:
                    if (event.shiftKey) {
						gotoSubIndex(this.parentNode, subIndex - 1);
					} else {
						gotoSubIndex(this.parentNode, subIndex + 1);
					}
					prevdef = true;
					break;
                case keys.esc:
                    gotoIndex(currentIndex);
                    prevdef = true;
                    break;
                case keys.left:
                    gotoIndex(currentIndex - 1);
                    prevdef = true;
                    break;
                case keys.up:
					gotoSubIndex(this.parentNode, subIndex - 1);
					prevdef = true;
					break;
				case keys.right:
					gotoIndex(currentIndex + 1);
					prevdef = true;
					break;
				case keys.down:
					gotoSubIndex(this.parentNode, subIndex + 1);
					prevdef = true;
					break;
			}
			if (prevdef) {
				event.preventDefault();
				//don't let the click "bubble up"
				event.stopPropagation();
			}
			return false;
	});
});
