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

function queryStringToObject(queryString) {            
    var pairs = queryString.split("?")[1].split('&');
    
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}