javascript:
var input = prompt("Enter text to search for in collected info from http.response body (datalayer):");
var censsearch = "https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q=services.http.response.body%3A" + '"' + input + '"' + "+and+services.http.response.body%3A" + '"' + "dataLayer" + '"';
function CenSys() { window.open(censsearch, "_blank"); } 
CenSys();
