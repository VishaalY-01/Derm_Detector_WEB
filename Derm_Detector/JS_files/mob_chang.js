// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the list item and the image elements by their IDs
    var listItem1 = document.getElementById('li1');
    var listItem2 = document.getElementById('li2');
    var listItem3 = document.getElementById('li3');
    var image = document.getElementById('MobImg');

    // Function to change the image and trigger the animation
    function changeImage(newSrc) {
        image.src = newSrc; // Change the image source
        image.classList.remove('popup-animation'); // Remove the class (if already applied)
        void image.offsetWidth; // Trigger reflow to restart the animation
        image.classList.add('popup-animation'); // Add the class to trigger animation
    }

    // Add hover event listeners to the list items
    listItem1.addEventListener('mouseover', function() {
        changeImage('../ddscan_cont_files/Mob1.png'); // Change image to Image 1
    });

    listItem2.addEventListener('mouseover', function() {
        changeImage('../ddscan_cont_files/Mob2.png'); // Change image to Image 2
    });

    listItem3.addEventListener('mouseover', function() {
        changeImage('../ddscan_cont_files/Mob3.png'); // Change image to Image 3
    });
});
