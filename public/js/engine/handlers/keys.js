export default function keyListener() {
	this._pressed = {},
	this._events = {},
	this._cooldown = {},
  
  	this.isDown = function(keyCode) {
    	return this._pressed[keyCode];
  	}.bind(this),
	
	this.getEvent = function(keyCode) {
    	return this._events[keyCode];
  	}.bind(this),

	this.getCoolDown = function(keyCode) {
    	return this._cooldown[keyCode];
  	}.bind(this),
  
 	this.onKeydown = function(event) {
		this._pressed[event.keyCode] = true;
		this._events[event.keyCode] = event;
  	}.bind(this),
  
 	this.onKeyup = function(event) {
   		delete this._pressed[event.keyCode];
		delete this._events[event.keyCode];
  	}.bind(this)
};