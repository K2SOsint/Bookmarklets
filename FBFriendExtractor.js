javascript:

function Scrolling() {
  const scrollInterval = 50;
  const scrollStep = 50;
  let scrollPosition = 0;

  function scrollToBottom() {
    if (scrollPosition < document.body.scrollHeight) {
      scrollPosition += scrollStep;
      window.scrollTo(0, scrollPosition);
      setTimeout(scrollToBottom, scrollInterval);
    } else {
      
      extractFB();
    }
  }

  setTimeout(scrollToBottom, 2000);
}

Scrolling();

function extractFB() {
  const links = document.getElementsByTagName('a');
  const uniqueLinks = new Set();

  for (let i = 0; i < links.length; i++) {
    const href = links[i].getAttribute('href');
    if (href && href.includes('facebook.com') && !href.includes('/photo') && !href.includes(location.href)) {
      uniqueLinks.add(href);
    }
  }

  const facebookLinks = Array.from(uniqueLinks);

  if (facebookLinks.length > 0) {
    const resultWindow = window.open();
    resultWindow.document.write(
      '<h2>Links containing "facebook.com" found:</h2>' + location.href + ('<ul>') +
      facebookLinks.map(link => `<li>${link}</li>`).join('') +
      '</ul>'
    );
    resultWindow.document.close();
  } else {
    alert('No relevant links found on this page.');
  }
}
