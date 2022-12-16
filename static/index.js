const form = document.querySelector('form');
const input = document.querySelector('input');

// Thanks, codebubb
const sha256script = document.createElement('script');
sha256script.src = "https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js";

document.head.appendChild(sha256script);

function getCookie(name) {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : false;
}

let verified = false;
let password_hash = "9696c9db488765014101d64145fcba5eb435bf0634eb8c1043adec6f9c4192b0"

while(!verified) {
    if(getCookie("verified") == "yes") {
        verified = true;
        break;
    }
	
	console.log('yesagain')
    // Is not verified
    let pass = prompt("What is the password?");
	console.log("yesno")
    let input_hash = sha256(pass);
   
	console.log("no")
    if(input_hash == password_hash) {
	    console.log('yes');
        verified = true;
        document.cookie = "verified=yes; expires=Tue, 19 Jan 2038 04:14:07 GMT"
    }else {
        console.log("not correct, given hash was: " + input_hash)
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
