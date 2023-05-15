// authentication:when someone registers and logs in 
// authorisation:when we want to allow someone to do something which needs users to be logged in
promises:
	// it is a special javascript object, it produces a value after an async operation completes
	// successfull or an error if it does not complete successfully due to time out , network errors
	//  or others.

	//  successfull calls are indicated by resolve and failed ones are by  reject function call;
	let promise = new promise(function(resolve, reject) {
		//making an async call and either a resolve or a reject
	});

//we have callbacks in js for async functions but there is this problem with callbacks 
//but there may be nested callabacks and this is called callback hell

a promise object has the following things as its part
state //this property has following values
1. pending //when the exection starts
2. fulfilled //when the promise is resolved
3. rejected //when the promise is rejected

result //following are the values of this property
1. undefined //initially when the state is pending
2. value //when resolve(value) is called
3. error //when reject(error) is called

let promise = new Promise((resolve, reject) => {
	resolve('resolved');
	reject(new Error('rejected'));
});
// if there are multiple resolve and rejects then only first one of each is called depending on the result

handling promises ?
	// there are handlere methods for doing this thing
	// .then() , .catch() , .finally()

	const consumerFunction = () => {
		promise.then({
			result => {}, //for resolved
			error => {} //for rejected
		})
	}

promise.then((result) => {
	console.log(result); //on success
}, (error) => {
	console.log(error); //on error
});

//this using the then and catch 
promise.then((result) => {
	/*do something with the result*/ }).catch((error) => {
	/*handle the error*/ })

// using .finally() with catch and then

promise.finally(()=>{
	loading=false;
	console.log('loading failed');
}).then((result)=>{
	console.log(result);
}).catch((error)=>{
	console.log(error);
});

// here .finally() makes the loading false and if the promise resolves then .then() is called
// and if promise fails then .catch() is called and .finally() is called irrespective of resolve or reject

jwt: these are tokens used to provide information only to the logged users
it is like a signature and contains header and other stuffs?
