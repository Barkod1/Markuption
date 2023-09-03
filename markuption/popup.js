chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    try {
        let url = new URL(tabs[0].url);
        if (isChromeHomepage(url)) {
            document.getElementById("myButton").remove();
        }
    } catch {
        document.getElementById("myButton").remove();
    }
});
chrome.storage.local.get(function(data) {
    let keys = Object.keys(data);
    let table = document.getElementById("table");
    for (let i = 0; i < keys.length; i++) {
        if (!keys[i].endsWith("getYpos") && !keys[i].endsWith("_icon")) {
            chrome.storage.local.get([keys[i]]).then((result) => {
                let value = result[keys[i]];
                let tr = document.createElement("tr");
                let el = document.createElement("td");
                let a = document.createElement("a");
                let img = document.createElement("img");

                a.href = value;
                chrome.storage.local.get([keys[i] + "_icon"]).then((result) => {

                    img.src = result[keys[i] + "_icon"]
                    img.className = "img-fluid"
                    img.style = img.style = "width: 20px; height: 20px;"
                    if (!img.src || img.src == "undefined" || img.src == undefined || !result[keys[i] + "_icon"]) {
                        img.src = "/globe_uk_FILL0_wght400_GRAD0_opsz48.png"
                    }
                })
                a.innerText = keys[i];
                a.className = "link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover";
                a.onclick = () => {
                    chrome.tabs.update({ url: value }, function(tab) {
                        chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['updateYpos.js'] });
                        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                            if (tabId === tab.id && changeInfo.status === 'complete') {
                                chrome.tabs.sendMessage(tab.id, { message: "startUpdatingYpos" }, function(response) {});
                            }
                        });
                    });
                };
                el.appendChild(img);
                el.appendChild(a);

                tr.appendChild(el)
                table.appendChild(tr);

            })
        }

    }
});

document.getElementById('myButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        try {
            let url = new URL(tabs[0].url);
            let hostnameParts = url.hostname.split('.');
            let baseDomain = hostnameParts.slice(-2).join('.');
            if (hostnameParts.length === 3) {
                baseDomain = hostnameParts.slice(-3).join('.');
            }
            chrome.storage.local.get([baseDomain]).then((result) => {
                if (result[baseDomain] != undefined && result[baseDomain] != null) return;
                chrome.storage.local.set({
                    [baseDomain]: url.toString()
                }).then(() => {});
                let table = document.getElementById("table");

                let body = document.getElementById("body")

                chrome.storage.local.get([baseDomain]).then((result) => {
                    let value = result[baseDomain];
                    let tr = document.createElement("tr");
                    let el = document.createElement("td");
                    let a = document.createElement("a");
                    let img = document.createElement("img");

                    a.href = value;
                    a.innerText = baseDomain
                    a.className = "link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover";
                    a.onclick = () => {
                        chrome.tabs.update({ url: value }, function(tab) {
                            chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['updateYpos.js'] });
                            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                                if (tabId === tab.id && changeInfo.status === 'complete') {
                                    chrome.tabs.sendMessage(tab.id, { message: "startUpdatingYpos" }, function(response) {});
                                }
                            });
                        });
                    };
                    chrome.storage.local.get([baseDomain + "_icon"]).then((result) => {
                        img.src = result[baseDomain + "_icon"]
                        img.className = "img-fluid"
                        img.style = "width: 20px; height: 20px;"
                        if (!img.src || img.src == "undefined" || img.src == undefined || !result[baseDomain + "_icon"]) {
                            img.src = "/globe_uk_FILL0_wght400_GRAD0_opsz48.png"
                        }
                    })
                    el.appendChild(img)
                    el.appendChild(a);

                    tr.appendChild(el)
                    table.appendChild(tr);
                })
                body.appendChild(table)
            })

        } catch {

        }

    });


})


function isChromeHomepage(url) {
    return url.href === 'chrome://newtab/' || url.href === 'chrome://homepage/' || url.protocol === "chrome:" || url.href == "chrome://URL";
}