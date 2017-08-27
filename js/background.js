/**
 * Get tokens.
 */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({});

    var params = Twitter.deparam(request.session);

    contextItem = chrome.contextMenus.create({
        id: "import-tweet",
        title: "Import latest tweet",
        contexts: ["editable"],
    });

    // Get access tokens again.
    Twitter.api('oauth/access_token', 'POST', params, function(res) {
        Twitter.setOAuthTokens(Twitter.deparam(res), function() {
            alert("Connected to Twitter!");
        });
    });
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {

    if (info.menuItemId == "import-tweet") {

        Twitter.api('statuses/home_timeline', 'GET', { count: 1 }, function(res) {
            
            console.log(res[0].text);   // logs tweet as plain text

            chrome.tabs.sendMessage( tab.id, {
                action: "tweet-fetched", 
                tweet: res[0].text
            });
        });
    }
});
