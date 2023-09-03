// Get the favicon URL
let faviconUrl = null;
let linkTags = document.getElementsByTagName('link');
for (let i = 0; i < linkTags.length; i++) {
    if (linkTags[i].rel.toLowerCase() === 'icon') {
        faviconUrl = linkTags[i].href;
        break;
    }
}
// Save the favicon URL in Chrome storage
let url = new URL(window.location.href);
let hostnameParts = url.hostname.split('.');
let baseDomain = hostnameParts.slice(-2).join('.');
if (hostnameParts.length === 3) {
    baseDomain = hostnameParts.slice(-3).join('.');
}
let key = baseDomain + "_icon";
chrome.storage.local.set({
    [key]: [faviconUrl]
}, function() {});
setInterval(function() {
    let scrollY = window.scrollY.toString();
    let url = new URL(window.location.href);
    let hostnameParts = url.hostname.split('.');
    let baseDomain = hostnameParts.slice(-2).join('.');
    if (hostnameParts.length === 3) {
        baseDomain = hostnameParts.slice(-3).join('.');
    }
    baseDomain += "getYpos";
    try {
        chrome.storage.local.set({
            [baseDomain]: [scrollY]
        }).then(() => {});
    } catch {}
}, 3000);