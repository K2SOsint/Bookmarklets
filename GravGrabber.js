javascript:

function DoSomething(){
    var md5 = prompt("Enter the MD5 hash:");
    if(md5) {
        var google = 'https://www.google.com/search?q="' + md5 + '"';
        var pic = 'https://www.gravatar.com/avatar/' + md5 + '?s=96&r=g';
        var profile = 'https://www.gravatar.com/' + md5;
        var json = 'https://www.gravatar.com/' + md5 +'.json';
        
        window.open(google, '_blank');
        window.open(pic, '_blank');
        window.open(profile, '_blank');
        window.open(json, '_blank');
    }
}

DoSomething();
