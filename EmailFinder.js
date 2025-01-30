javascript:

var mail = [];
var webpage = document.body.innerHTML;

var regex = /[a-zA-Z0-9._-]+(?:@| {at} )[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}/g;

function MailFinder() {
  var match;
  while (match = regex.exec(webpage)) {

    var email = match[0].replace(/ {at} /g, '@');

    if (mail.indexOf(email) === -1) mail.push(email);
  }

  var outputWindow = window.open('', 'Mail Output', 'width=600,height=400,scrollbars=yes');
  outputWindow.document.write('<html><head><title>MailFinder - by K2SOsint</title></head><body>');

  if (mail.length > 0) {
    outputWindow.document.write('<h2>E-mail Addresses found on this page:</h2>');
    outputWindow.document.write('<ul>');
    mail.forEach(function (email) {
      outputWindow.document.write('<li>' + email + '</li>');
    });
    outputWindow.document.write('</ul>');
    outputWindow.document.write('<p>Beware of possible false positives, always double-check!</p>');
  } else {
    outputWindow.document.write('<h1>No e-mail addresses found.</h1>');
    outputWindow.document.write('<p>Perform a manual check to be sure.</p>');
  }

  outputWindow.document.write('</body></html>');
  outputWindow.document.close();
}

MailFinder();
