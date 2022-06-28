javascript:
var input = prompt("Enter the part of the GTM code, that starts after GTM-");
var censgtm = "https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q=services.http.response.body%3A" + '"' + "gtm-" + input + '"' + "+and+services.http.response.body%3A" + '"' + "dataLayer" + '"';
function CenSys() { window.open(censgtm, "_blank"); } 
CenSys();
