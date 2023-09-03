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
                a.className = "link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover";
                a.onclick = () => {
                    chrome.storage.local.remove([a.innerText], function(result) {});
                    chrome.storage.local.remove([a.innerText + "getYpos"], function(result) {});
                    chrome.storage.local.remove([a.innerText + "_icon"], function(result) {});
                    el.removeChild(a)
                    el.removeChild(img)
                };
                el.appendChild(img);
                el.appendChild(a);

                tr.appendChild(el)
                table.appendChild(tr);

            })
        }

    }
});