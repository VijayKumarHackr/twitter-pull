/**
 * Get and send oauth tokens from query string.
 */
if( window.location.host == "nvijaykumar.me") {
    chrome.runtime.sendMessage({
        type: 'auth', session: window.location.search.substr(1)
    }, function(response) {
        window.open('', '_self', '');
        window.close();
    });
}

var context;

chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
    console.log(message);

    if( message.action == "tweet-fetched" ) {
        console.log(context);
        $(context).val( message.tweet )
        $(context)
        console.log(message.tweet);
    }
});


$(function(){
    $('textarea, input').on('contextmenu', function(e) {
        context = $(this);
    });
});
