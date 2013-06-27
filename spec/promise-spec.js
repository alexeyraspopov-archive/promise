describe('promise', function(){
	var promise;

	beforeEach(function(){
		promise = new Promise();
	});

	it('should call fulfilled handler on success', function(){
		var complete = false;

		promise.then(function(){
			complete = true;
		});

		promise.resolve();

		expect(complete).toBe(true);
	});

	it('should call error handler on fail', function(){
		var complete = false,
			failed = false;

		promise.then(function(){
			complete = true;
		}, function(){
			failed = true;
		});

		promise.reject();

		expect(complete).toBe(false);
		expect(failed).toBe(true);
	});

	it('should remove all pending on complete', function(){
		promise.then(function(){});

		expect(promise.pending.length).toBe(1);

		promise.resolve();

		expect(promise.pending.length).toBe(0);
	});

	it('should call handlers with result of deferred work', function(){
		promise.then(function(value){
			expect(value).toBe(13);
		});

		promise.resolve(13);
	});

	it('should return new promise for chaining', function(){
		var newPromise = promise.then();

		expect(newPromise instanceof Promise).toBeTruthy();
	});

	it('should call the same methods in chain', function(){
		var count = 0;

		promise.then(function(){
			count++;
		}).then(function(){
			count++;
		});

		promise.resolve();

		expect(count).toBe(2);
	});

	it('should call chaining handlers with result of previous promise', function(){
		promise.then(function(value){
			return value + 1;
		}).then(function(value){
			expect(value).toBe(2);
		});

		promise.resolve(1);
	});

	it('should chain promise if new promise is result of pending handler', function(){
		var newPromise;

		promise.then(function(){
			newPromise = new Promise();

			return newPromise;
		}).then(function(value){
			expect(value).toBe(true);
		});

		promise.resolve();
		newPromise.resolve(true);
	});
});