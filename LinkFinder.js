javascript:

function DoSomething() {
    var links = document.getElementsByTagName('a');
    var allLinks = '';
    for (var i = 0; i < links.length; i++) {
        allLinks += links[i].href + '<br>';
    }
    var newTab = window.open();
    newTab.document.write(allLinks);
}

DoSomething();
