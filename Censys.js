javascript:

var input = prompt('Enter a complete analytics code to search Censys : ');
var url = 'https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=INCLUDE&q=services.http.response.body%3A' + input;

function DoSomething() {
	window.open(url, '_blank');
} 

DoSomething();
