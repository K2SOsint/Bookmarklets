javascript:

var input = prompt('Enter the analytics-code to search');
var builtwith = 'https://builtwith.com/relationships/tag/' + input;
var censys = 'https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=INCLUDE&q=services.http.response.body%3A' + input;

function DoSomething() {
	window.open(builtwith, '_blank');
	window.open(censys, '_blank');
}

DoSomething();
