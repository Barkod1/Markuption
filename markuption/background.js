chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {


    // Code to run when the URL changes
    if (changeInfo.status == 'complete') {
        let url = new URL(tab.url);
        let hostnameParts = url.hostname.split('.');
        let baseDomain = hostnameParts.slice(-2).join('.');
        if (hostnameParts.length === 3) {
            baseDomain = hostnameParts.slice(-3).join('.');
        }
        chrome.storage.local.get([baseDomain], function(result) {
            let value = result[baseDomain];

            if (value) {
                chrome.storage.local.set({
                    [baseDomain]: url.toString()
                }).then(() => {

                });



            }
        });

        // if (!isChromeHomepage(url)) {
        //     chrome.scripting.executeScript({ target: { tabId: tabId }, files: ['content_script.js'] });
        //     console.log("excetued " + baseDomain)
        // }
    }
});

function isChromeHomepage(url) {
    return url === 'chrome://newtab/' || url === 'chrome://homepage/' || url === 'chrome://URL';
}