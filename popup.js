// Initialize toggle switch state
const toggleSwitch = document.getElementById("togglePause").querySelector('input');
    console.log(toggleSwitch);
    
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;
        console.log(tabs[0].url);

        if (tabs[0].url.includes('youtube.com')) {
            console.log("if");
            
            chrome.storage.local.get([`isEnabled_${tabId}`], function(result) {
                if (chrome.runtime.lastError) {
                    console.error("Error retrieving storage:", chrome.runtime.lastError);
                } else {
                    // Set the checkbox state based on the stored value
                    toggleSwitch.checked = result[`isEnabled_${tabId}`] || false;
                    console.log(toggleSwitch.checked);
                    
                }

            });

        }

        else{

            console.log("else");
            
            document.getElementById('togglePause').style.display = "none";
            document.querySelector('#main-con h4').innerHTML = "only valid on YouTube URL.";
            document.querySelector('#main-con').style.display = "flex";
            document.querySelector('#main-con').style.justifyContent = "center";
   
        }
        
        // Retrieve the stored state for the current tab
        
    });


// When the toggle is changed, send the state to content.js
toggleSwitch.addEventListener('change', function() {
    const isEnabled = toggleSwitch.checked;
    
    console.log(isEnabled);
    
        

    // Send the message to the active tab to enable/disable the feature
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;

        // Store the new state in chrome.storage.local
        chrome.storage.local.set({ [`isEnabled_${tabId}`]: isEnabled });
        console.log(tabId);
        chrome.tabs.sendMessage(tabs[0].id, { isEnabled: isEnabled });
    });
});
