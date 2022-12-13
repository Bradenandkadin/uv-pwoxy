const form = document.querySelector('form');
const input = document.querySelector('input');

function getCookie(name) {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : false;
}

let verified = false;

while(!verified) {
    if(getCookie("verified") == "yes") {
        verified = true;
        break;
    }

    // Is not verified
    let pass = prompt("What is the password?");
    if(pass == "bottlewater") {
        verified = true;
        document.cookie = "verified=yes;"
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};
