javascript:
var input = prompt("Please enter UA code without UA-");
var censysua = "https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q=services.http.response.body%3A" + '"' + "%27_setAccount%27" + '"' + "+and+services.http.response.body%3A" + '"' + "ua-" + input + '"';
function CensysUA() { window.open(censysua, "_blank"); }
CensysUA();
