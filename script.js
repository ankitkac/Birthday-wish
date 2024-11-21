function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
// Function to calculate the remaining time for the countdown
function updateCountdown() {
    const now = new Date();
    const indiaTimeOffset = 5.5 * 60 * 60 * 1000; // Indian Standard Time (IST) offset from UTC
    const indiaTime = new Date(now.getTime() + indiaTimeOffset);

    // Target time: 12 AM on November 22nd
    const birthdayTime = new Date(indiaTime.getFullYear(), 10, 22, 0, 0, 0); // November 22, 12 AM IST

    const timeDifference = birthdayTime - indiaTime;

    if (timeDifference <= 0) {
        // Time is up, show birthday message
        document.getElementById('greeting').classList.remove('hidden');
        document.getElementById('countdown').classList.add('hidden');
        showNotification();
    } else {
        // Update countdown display
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `Time until Birthday: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Function to display a notification when the birthday arrives
function showNotification() {
    if (Notification.permission === 'granted') {
        new Notification("Happy Birthday Akshay!", {
            body: "Wishing you a fantastic year ahead!",
            icon: 'birthday-icon.png'  // Replace with your image
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification("Happy Birthday Akshay!", {
                    body: "Wishing you a fantastic year ahead!",
                    icon: 'birthday-icon.png'
                });
            }
        });
    }
}

// Request notification permission when the page loads
if (Notification.permission !== 'denied') {
    Notification.requestPermission();
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial countdown check
updateCountdown();
(function () {
	showTime();
}, 1000);