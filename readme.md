# Promise

## Import

Simple browser import via HTML

```HTML
<script src="path/to/component/promise.min.js"></script>
```

Require AMD module (require.js)

```javascript
require.config({
	paths: {
		promise: 'path/to/component/promise.min.js'
	}
});

define(['promise'], function(Promise){
	var promise = new Promise();
});
```

via Node.js

```bash
npm install git@github.com:alexeyraspopov/promise.git
```

```javascript
var Promise = require('promise');
```

## Using

Create promise instance

```javascript
var promise = new Promise();
```

Use ```resolve``` and ```reject``` methods when your deferred work have been done

```javascript
function getData(url){
	var xhr = new XMLHttpRequest(),
		promise = new Promise();

	xhr.onreadystatechange = function(){
		if(this.readyState === 4){
			if(this.status === 200){
				promise.resolve(this.responseText);
			}else{
				promise.reject(this.status);
			}
		}
	};

	xhr.open('GET', url, true);
	xhr.send();

	return promise;
}

getData('http://example.com').then(function(response){
	process(JSON.parse(response));
}, function(errorCode){
	throw new Error('Server error. code: ' + errorCode);
});
```

If you have more than one async method to do you can create a chain. Example from [CommonJS Promise/A proposal](http://wiki.commonjs.org/wiki/Promises/A)

```javascript
asyncComputeTheAnswerToEverything().
	then(addTwo).
	then(printResult, onError);
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) (c) Alexey Raspopov