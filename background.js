const FREE_TRIAL_PERIOD_DAYS = 2;
const APP_ID = "bgennlofmbkobjldjlnijimhiohpahop";

var currentLevelData = null;

function verifyLicense(callback) {
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        
        if(!token) {
            console.log("Error: could not get token");
            return callback(null);
        }

        $.ajax({
            url: "https://www.googleapis.com/chromewebstore/v1.1/userlicenses/" + APP_ID,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .done(function(license) {
            var licenseStatus = null;

            if (license.result && license.accessLevel == "FULL") {
                licenseStatus = "FULL";
            } 
            else if (license.result && license.accessLevel == "FREE_TRIAL") {
                var daysAgoLicenseIssued = Date.now() - parseInt(license.createdTime, 10);
                daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24;
                
                if (daysAgoLicenseIssued <= FREE_TRIAL_PERIOD_DAYS) {
                    licenseStatus = "FREE_TRIAL";
                }
                else {
                    licenseStatus = "FREE_TRIAL_EXPIRED";
                }
            }
            else {
                licenseStatus = "NONE";
            }

            console.log("cracker license: " + licenseStatus);
            callback(licenseStatus);
        }); 
    });   
}

chrome.runtime.onMessage.addListener(
    function(request, sender, callback) {
        if(request.verifyLicense) {
            //verifyLicense(callback);
            callback("FULL");
            return true;
        }
        if(request.getCurrentLevelData) {
            callback(currentLevelData);
            return true;
        }
    }
);

// store data about the current level by temporarily intercepting the gameStart request
// which happens when a game starts
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details.url);

        var queryStringParts = queryStringToObject(decodeURIComponent(details.url));

        currentLevelData = {
            episode: queryStringParts["arg0"],
            level: queryStringParts["arg1"],
            session: queryStringParts["_session"],
            seed: queryStringParts["arg2"]
        };

        console.log(currentLevelData);
    },
    {
        urls: ["*://candycrush.king.com/api/gameStart2*"]
    },
    ["blocking"]
);

// store data about the user by temporarily intercepting the poll request, which happens on load
// of Candy Crush
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details.url);

        var queryStringParts = queryStringToObject(decodeURIComponent(details.url));

        if(!currentLevelData) {
            currentLevelData = {};
        }
        
        currentLevelData.session = queryStringParts["_session"];

        console.log(currentLevelData);
    },
    {
        urls: ["*://candycrush.king.com/api/poll*"]
    },
    ["blocking"]
);

// store data about the game by temporarily intercepting the RPC requests
// not sure why, but some games use RPC (/rpc) while others use a regular API (/api)
// so this is basically doing the above sniffing, but for RPC games
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details.url);

        var queryStringParts = queryStringToObject(decodeURIComponent(details.url));

        if(!currentLevelData) {
            currentLevelData = {};
        }
        
        if(queryStringParts["_session"]) {
            currentLevelData.session = queryStringParts["_session"];
        }

        if(details.requestBody) {
            var requestBodyArrayBuffer = details.requestBody.raw[0].bytes;
            var requestBodyStr = arrayBufferToString(requestBodyArrayBuffer);
            
            if(requestBodyStr.indexOf("trackSagaGameStart2") !== -1) {
                var gameStartRequestBody = JSON.parse(requestBodyStr);

                currentLevelData.episode = gameStartRequestBody[0].params[4];
                currentLevelData.level = gameStartRequestBody[0].params[5];
                currentLevelData.seed = gameStartRequestBody[0].params[6];
            }
        }

        console.log(currentLevelData);
    },
    {
        urls: [
             "*://candycrush.king.com/rpc/ClientApi*"
         ]
    },
    ["blocking", "requestBody"]
);

function queryStringToObject(queryString) {            
    var pairs = null;
    try {
        pairs = queryString.split("?")[1].split('&');
    }
    catch(e) {
        pairs = [];
    }
    
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

function arrayBufferToString(buffer){
    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    if(/[\u0080-\uffff]/.test(str)){
        throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
}