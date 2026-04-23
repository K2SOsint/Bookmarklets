javascript:

var input = prompt('Enter the analytics-code to search');
var builtwith = 'https://builtwith.com/relationships/tag/' + input;

function DoSomething() {
	window.open(builtwith, '_blank');
	window.open(censys, '_blank');
}

DoSomething();
