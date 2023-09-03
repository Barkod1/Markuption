chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === "startUpdatingYpos") {
        let url = new URL(window.location.href);
        let hostnameParts = url.hostname.split('.');
        let baseDomain = hostnameParts.slice(-2).join('.');
        if (hostnameParts.length === 3) {
            baseDomain = hostnameParts.slice(-3).join('.');
        }
        chrome.storage.local.get([baseDomain + "getYpos"]).then((result) => {
            let res = result[baseDomain + "getYpos"]
            window.scrollTo(0, res);
        });
    }
});