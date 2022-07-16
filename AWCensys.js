javascript:
var input = prompt("Please enter AW code without AW-");
var censysaw = "https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q=services.http.response.body%3A" + '"' + "%27gtag%27" + '"' + "+and+services.http.response.body%3A" + '"' + "aw-" + input + '"';
function CensysAW() { window.open(censysaw, "_blank"); }
CensysAW();
