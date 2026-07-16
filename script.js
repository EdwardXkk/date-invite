// State
let rejectBtnLeft = 0;
let rejectBtnTop = 0;
let moveCount = 0;
let isModalOpen = false;

// DOM Elements
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');
const hiddenDatePicker = document.getElementById('hiddenDatePicker');
const visibleDatePicker = document.getElementById('visibleDatePicker');
const datePickerModal = document.getElementById('datePickerModal');
const dateConfirmBtn = document.getElementById('dateConfirmBtn');
const dateCancelBtn = document.getElementById('dateCancelBtn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');

// Contact/Notification modal elements
const contactModal = document.getElementById('contactModal');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const contactCancelBtn = document.getElementById('contactCancelBtn');
const contactConfirmBtn = document.getElementById('contactConfirmBtn');

// Selected date storage
let selectedDate = '';

// Initialize
function init() {
    positionRejectButton();
    setupEventListeners();
    setupDatePicker();
}

// Position the reject button
function positionRejectButton() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = 150;
    const buttonHeight = 60;

    // Start position: right side, middle-bottom
    const left = screenWidth - buttonWidth - 40;
    const top = screenHeight * 0.65;

    rejectBtnLeft = left;
    rejectBtnTop = top;
    updateRejectButtonPosition();
}

// Update reject button position
function updateRejectButtonPosition() {
    rejectBtn.style.left = `${rejectBtnLeft}px`;
    rejectBtn.style.top = `${rejectBtnTop}px`;
}

// Move reject button to random position
function moveRejectButton() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = 150;
    const buttonHeight = 60;

    // Keep button within safe bounds
    const minLeft = 20;
    const maxLeft = screenWidth - buttonWidth - 20;
    const minTop = 150; // Below question text
    const maxTop = screenHeight - buttonHeight - 100; // Above bottom area

    // Generate random position
    const newLeft = Math.random() * (maxLeft - minLeft) + minLeft;
    const newTop = Math.random() * (maxTop - minTop) + minTop;

    rejectBtnLeft = newLeft;
    rejectBtnTop = newTop;
    moveCount++;

    updateRejectButtonPosition();
}

// Show modal
function showModal(title, text, confirmText, cancelText, onConfirm, onCancel) {
    isModalOpen = true;
    document.body.classList.add('modal-open');
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalConfirmBtn.textContent = confirmText;
    modalCancelBtn.textContent = cancelText || 'Cancel';

    modalConfirmBtn.onclick = (e) => {
        e.preventDefault();
        hideModal();
        if (onConfirm) onConfirm();
    };

    modalCancelBtn.onclick = (e) => {
        e.preventDefault();
        hideModal();
        if (onCancel) onCancel();
    };

    modal.classList.remove('hidden');
}

// Hide modal
function hideModal() {
    isModalOpen = false;
    document.body.classList.remove('modal-open');
    modal.classList.add('hidden');
}

// Show toast message
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// Setup date picker
function setupDatePicker() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    hiddenDatePicker.min = today;
    if (visibleDatePicker) {
        visibleDatePicker.min = today;
    }
}

// Open native date picker
function openDatePicker() {
    // Show date picker modal
    showDatePickerModal();
}

// Show date picker modal
function showDatePickerModal() {
    isModalOpen = true;
    datePickerModal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Set today as default
    const today = new Date().toISOString().split('T')[0];
    visibleDatePicker.value = today;

    // Small delay to ensure modal is fully visible
    setTimeout(() => {
        visibleDatePicker.focus();
    }, 100);
}

// Hide date picker modal
function hideDatePickerModal() {
    isModalOpen = false;
    datePickerModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

// Handle date selection
function onDateSelected(date) {
    if (!date) return;

    selectedDate = date;
    const [year, month, day] = date.split('-');

    // Show contact modal to collect notification info
    showContactModal();
}

// Show contact modal
function showContactModal() {
    isModalOpen = true;
    contactModal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Clear inputs
    emailInput.value = '';
    phoneInput.value = '';
}

// Hide contact modal
function hideContactModal() {
    isModalOpen = false;
    contactModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

// Send notifications (multiple methods)
async function sendNotifications() {
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const [year, month, day] = selectedDate.split('-');

    const notificationData = {
        date: `${month}/${day}/${year}`,
        timestamp: new Date().toISOString(),
        email: email,
        phone: phone,
        location: window.location.href
    };

    hideContactModal();

    // Show loading
    showToast('Sending notifications... 📤');

    try {
        // Method 1: Email notification (using mailto for simplicity)
        if (email) {
            sendEmailNotification(email, month, day, year);
        }

        // Method 2: SMS via Twilio (requires API keys)
        if (phone) {
            await sendSMSNotification(phone, month, day, year);
        }

        // Method 3: Save to localStorage for backup
        saveToLocalStorage(notificationData);

        // Method 4: Webhook (you can add your own endpoint)
        await sendToWebhook(notificationData);

        // Show success message
        setTimeout(() => {
            showConfirmation(month, day, year);
        }, 500);

    } catch (error) {
        console.error('Notification error:', error);
        showToast('Date saved! Share it manually 📅');
        setTimeout(() => {
            showConfirmation(month, day, year);
        }, 1500);
    }
}

// Send email notification
function sendEmailNotification(email, month, day, year) {
    const subject = encodeURIComponent('💕 Date Confirmed!');
    const body = encodeURIComponent(
        `Great news! Someone has accepted your date invitation!\n\n` +
        `📅 Date: ${month}/${day}/${year}\n` +
        `⏰ Time: ${new Date().toLocaleTimeString()}\n` +
        `💝 Your date invite link is ready to share!`
    );

    // Open default email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

// Send SMS via Twilio (you need to configure this)
async function sendSMSNotification(phone, month, day, year) {
    // Option 1: Using Twilio (requires account)
    // Uncomment and configure if you have Twilio:
    /*
    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            To: phone,
            From: 'YOUR_TWILIO_NUMBER',
            Body: `💕 Date confirmed: ${month}/${day}/${year}!`
        })
    });
    return response.json();
    */

    // Option 2: Simple SMS link (opens default SMS app)
    const message = encodeURIComponent(`💕 Date confirmed: ${month}/${day}/${year}!`);
    window.location.href = `sms:${phone}?body=${message}`;

    return { success: true };
}

// Save to localStorage (backup)
function saveToLocalStorage(data) {
    const dates = JSON.parse(localStorage.getItem('dateInvites') || '[]');
    dates.push(data);
    localStorage.setItem('dateInvites', JSON.stringify(dates));
}

// Send to webhook (optional - add your own endpoint)
async function sendToWebhook(data) {
    // Option 1: Discord Webhook
    const discordWebhook = localStorage.getItem('discordWebhook');
    if (discordWebhook) {
        await fetch(discordWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `💕 **New Date Accepted!**\n📅 Date: ${data.date}\n⏰ Time: ${new Date(data.timestamp).toLocaleString()}`,
                embeds: [{
                    title: "Date Confirmed!",
                    description: `Someone has accepted your date invitation!\n\n**Date:** ${data.date}\n**Time:** ${new Date(data.timestamp).toLocaleTimeString()}`,
                    color: 15158332,
                    footer: { text: "Date Invite App" }
                }]
            })
        });
    }

    // Option 2: Custom webhook (add your endpoint)
    // const customWebhook = localStorage.getItem('customWebhook');
    // if (customWebhook) {
    //     await fetch(customWebhook, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data)
    //     });
    // }

    return { success: true };
}

// Show final confirmation
function showConfirmation(month, day, year) {
    showModal(
        '✨ Date Confirmed!',
        `Great! Let's meet on ${month}/${day}/${year}!\nCan't wait! 😊`,
        'Awesome!',
        '',
        () => {
            showToast('See you then! 💕');
        }
    );
}

// Event Listeners
function setupEventListeners() {
    // Accept button
    acceptBtn.addEventListener('click', handleAccept);
    acceptBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleAccept();
    });

    // Reject button - move on touch
    rejectBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveRejectButton();
    });

    rejectBtn.addEventListener('touchmove', (e) => {
        e.preventDefault();
        moveRejectButton();
    });

    rejectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleRejectClick();
    });

    // Date picker modal buttons
    dateConfirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedDate = visibleDatePicker.value;
        hideDatePickerModal();

        if (selectedDate) {
            onDateSelected(selectedDate);
        } else {
            showToast('Please select a date first! 📅');
        }
    });

    dateCancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideDatePickerModal();
    });

    // Date picker change - just update state, don't auto-confirm
    visibleDatePicker.addEventListener('change', (e) => {
        e.preventDefault();
        // Value is already updated, wait for user to confirm
    });

    // Prevent date picker click from closing modal
    visibleDatePicker.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Contact modal buttons
    contactConfirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sendNotifications();
    });

    contactCancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideContactModal();
        // Still show confirmation even without contact info
        const [year, month, day] = selectedDate.split('-');
        showConfirmation(month, day, year);
    });

    // Allow Enter key to submit contact form
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            phoneInput.focus();
        }
    });

    phoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendNotifications();
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (!isModalOpen) {
            positionRejectButton();
        }
    });

    // Prevent scrolling on mobile
    document.body.addEventListener('touchmove', (e) => {
        if (isModalOpen) return;
        e.preventDefault();
    }, { passive: false });
}

// Handle accept
function handleAccept() {
    showModal(
        '🎉 Yay!',
        "I'm so happy you said yes!\nLet's pick a date!",
        "Let's Go!",
        'Cancel',
        () => {
            hideModal();
            setTimeout(() => {
                showDatePickerModal();
            }, 300);
        }
    );
}

// Handle reject click (if they somehow manage to click it)
function handleRejectClick() {
    if (moveCount > 2) {
        showToast("You missed it! 😜");
    }

    setTimeout(() => {
        moveCount = 0;
    }, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
