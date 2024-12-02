// Description:
// Your goal is to write an Event constructor function, which can be used to make testEvent objects.

// An testEvent object should work like this:

// it has a .subscribe() method, which takes a function and stores it as its handler
// it has an .unsubscribe() method, which takes a function and removes it from its handlers
// it has an .emit() method, which takes an arbitrary number of arguments and calls all the stored functions with these arguments
// As this is an elementary example of events, there are some simplifications:

// all functions are called with correct arguments (e.g. only functions will be passed to unsubscribe)
// you should not worry about the order of handlers' execution
// the handlers will not attempt to modify an testEvent object (e.g. add or remove handlers)
// the context of handlers' execution is not important
// each handler will be subscribed at most once at any given moment of time. It can still be unsubscribed and then subscribed again
// Also see an example test fixture for suggested usage

function Event() {
  this.handlers = [];
}

Event.prototype.subscribe = function (handler) {
  this.handlers.push(handler);
};

Event.prototype.unsubscribe = function (handler) {
  let i = this.handlers.indexOf(handler);
  if (-1 !== handler) {
    this.handlers.splice(i, 1);
  }
};

Event.prototype.emit = function () {
  let num = arguments;
  this.handlers.forEach(function (handler) {
    handler.apply(null, num);
  });
};

// Test:
(function () {
  const testCases = [];
  let testEvent = new Event();

  function f() {
    f.calls = (f.calls || 0) + 1;
    f.args = Array.prototype.slice.call(arguments);
  }

  testEvent.subscribe(f);
  testEvent.emit(1, 'foo', true);

  testCases.push([f.calls, 1]);
  testCases.push([f.args.join(), [1, 'foo', true].join()]);

  testEvent.unsubscribe(f);
  testEvent.emit(2);

  testCases.push([f.calls, 1]);

  const result = testCases.every(([func, result]) => func === result);
  if (result) {
    console.log('%cTest passed', 'color: green; font-weight: bold;');
  } else {
    console.error('Test failed');
  }
})();
