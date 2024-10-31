javascript:

var domain = window.location.hostname;
var adsTxtUrl = 'https://' + domain + '/ads.txt';

function DoIt() {

    fetch(adsTxtUrl)
        .then(response => {
            if (response.ok) {
                window.open('https://well-known.dev/resources/ads_txt/sites/' + domain, '_blank');
            } else {
                alert('No ads.txt file found on this domain.');
            }
        })
        .catch(error => {
            alert('Error checking ads.txt file: ' + error.message);
        });
}

DoIt();
