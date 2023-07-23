javascript:

  var emailreg = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  var foundemails = [];
  var alloftext = document.body.innerText + ' ' + document.documentElement.innerHTML;
  var matches = alloftext.match(emailreg);

function EmailFinder() {

  if (matches && matches.length > 0) {
    foundemails = matches;
  }

  if (foundemails.length > 0) {
    var emaillist = foundemails.join('\n');
    var popup = window.open();
    popup.document.write('<pre>' + emaillist + '</pre>');
  } 

  else {
    alert('No email addresses found on this page.');
  }
}

EmailFinder();
