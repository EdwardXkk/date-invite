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
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalConfirmBtn.textContent = confirmText;
    modalCancelBtn.textContent = cancelText || 'Cancel';

    modalConfirmBtn.onclick = () => {
        hideModal();
        if (onConfirm) onConfirm();
    };

    modalCancelBtn.onclick = () => {
        hideModal();
        if (onCancel) onCancel();
    };

    modal.classList.remove('hidden');
}

// Hide modal
function hideModal() {
    isModalOpen = false;
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

    // Set today as default
    const today = new Date().toISOString().split('T')[0];
    visibleDatePicker.value = today;

    // Focus on the date picker to trigger native picker on iOS
    setTimeout(() => {
        visibleDatePicker.focus();
        // For iOS Safari, click to trigger the native picker
        if (visibleDatePicker.click) {
            visibleDatePicker.click();
        }
    }, 100);
}

// Hide date picker modal
function hideDatePickerModal() {
    isModalOpen = false;
    datePickerModal.classList.add('hidden');
    visibleDatePicker.value = '';
}

// Handle date selection
function onDateSelected(date) {
    if (!date) return;

    const [year, month, day] = date.split('-');

    setTimeout(() => {
        showModal(
            '✨ Date Confirmed!',
            `Great! Let's meet on ${month}/${day}/${year}!\nCan't wait! 😊`,
            'Awesome!',
            '',
            () => {
                showToast('See you then! 💕');
            }
        );
    }, 100);
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
    dateConfirmBtn.addEventListener('click', () => {
        const selectedDate = visibleDatePicker.value;
        hideDatePickerModal();
        if (selectedDate) {
            onDateSelected(selectedDate);
        } else {
            showToast('Please select a date first! 📅');
        }
    });

    dateCancelBtn.addEventListener('click', () => {
        hideDatePickerModal();
    });

    // Date picker change (auto-confirm on selection)
    visibleDatePicker.addEventListener('change', (e) => {
        if (e.target.value) {
            setTimeout(() => {
                hideDatePickerModal();
                onDateSelected(e.target.value);
            }, 300);
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
                openDatePicker();
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
