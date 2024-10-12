javascript:

var input = prompt('Enter the analytics-code');
var builtwith = 'https://builtwith.com/relationships/tag/' + input;

function DoSomething() {
	window.open(builtwith);
}

DoSomething();
