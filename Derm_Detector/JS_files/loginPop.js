// Get modal, close button, and login button
const loginBt = document.getElementById('loginBt');
const modal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginIframe = document.getElementById('loginIframe');

// When the login button is clicked
loginBt.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    loginIframe.src = '/login.html'; // Load the login page into the iframe
    modal.style.display = "block";  // Show the modal
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
    loginIframe.src = ""; // Clear the iframe content when modal is closed
});

// Close the modal if clicked outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        loginIframe.src = ""; // Clear the iframe content when modal is closed
    }
});
