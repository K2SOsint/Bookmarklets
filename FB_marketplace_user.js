javascript:

var source = document.body.innerHTML;

var subsource = source.split(',\"userID\":\"')[1];

var userID = subsource.split('\"}')[0];

var marketplace = 'https://www.facebook.com/marketplace/?seller_profile=' + userID;

function DoSomething() {
	window.open(marketplace);
}

DoSomething();
