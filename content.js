let isEnabled = false;
console.log("extesion <!=>");

// Listen for messages from popup.js to enable or disable the pause/resume feature
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.isEnabled !== undefined) {
        isEnabled = request.isEnabled;
        
        
    }
});

// Listen for tab visibility changes
document.addEventListener("visibilitychange", function() {
    const video = document.querySelector("video");
    
    if (video && isEnabled) {
        if (document.hidden) {
            // Pause the video when the tab becomes hidden
            video.pause();
        } else {
            // Resume the video when the tab becomes visible
            video.play();
        }
    }
});
