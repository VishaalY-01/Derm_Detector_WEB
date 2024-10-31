function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none'; // Hide the modal
}

// Add event listener to the close button
document.getElementById('closeModal').onclick = function() {
    closeLoginModal(); // Close modal when 'x' is clicked
}

// Close modal if user clicks outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal(); // Close modal if clicked outside
    }
}