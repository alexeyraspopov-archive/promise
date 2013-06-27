(function(factory){
	'use strict';
function Promise(){
	this.pending = [];
}

Promise.prototype.then = function(success, fail){
	var promise = new Promise();

	this.pending.push({
		promise: promise,
		resolve: success,
		reject: fail || function(){}
	});

	return promise;
};

Promise.prototype.resolve = function(data){
	this.complete('resolve', data);
};

Promise.prototype.reject = function(error){
	this.complete('reject', error);
};

Promise.prototype.complete = function(type, data){
	var pending, result, promise;

	while(this.pending.length){
		pending = this.pending.shift();
		promise = pending.promise;
		result = pending[type](data);

		/* jshint loopfunc: true */
		if(result instanceof Promise){
			result.then(function(data){
				promise.resolve(data);
			}, function(error){
				promise.reject(error);
			});
		}else{
			promise[type](result);
		}
	}
};

factory('Promise', Promise);
})(function(name, object){
	if(typeof define === 'function' && define.amd){
		define(function(){
			return object;
		});
	}else if(typeof window === 'object'){
		window[name] = object;
	}else{
		module.exports = object;
	}
});