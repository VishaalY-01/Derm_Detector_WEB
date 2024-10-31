// JS_files/showCont.js

document.addEventListener("DOMContentLoaded", function() {
    const diLiElements = document.querySelectorAll('[id^="DiLi"]'); // Selects all elements with IDs starting with "DiLi"
    let lastClickedId = ""; // Keeps track of the last clicked diamond ID

    diLiElements.forEach((diLi) => {
        diLi.addEventListener('click', function() {
            const currentId = diLi.id;
            const currentBoxId = `box${currentId.replace('DiLi', '')}`; // Maps DiLi1 to box2, DiLi2 to box3, etc.

            const currentBox = document.getElementById(currentBoxId);
            const nextDiLiId = `DiLi${parseInt(currentId.replace('DiLi', '')) + 1}`;
            const nextDiLi = document.getElementById(nextDiLiId);

            if (lastClickedId !== currentId) {
                hideAllBoxes(); // Hide all boxes first
                showElements(currentBox, nextDiLi); // Show the corresponding box and next DiLi
                lastClickedId = currentId; // Update last clicked ID
            } else {
                hideAllBoxes(); // If the same ID is clicked again, hide all content
                lastClickedId = ""; // Reset the last clicked ID
            }
        });
    });

    function hideAllBoxes() {
        const allBoxes = document.querySelectorAll('[class^="box"]');
        const allDiLi = document.querySelectorAll('[id^="DiLi"]');
        allBoxes.forEach(box => {
            box.style.display = 'none'; // Hide all boxes
        });
        allDiLi.forEach(diLi => {
            if (diLi.id !== "DiLi1") {
                diLi.style.display = 'none'; // Hide all DiLi elements except the first one
            }
        });
    }

    function showElements(box, diLi) {
        if (box) {
            box.style.display = 'block'; // Show the corresponding box
        }
        if (diLi) {
            diLi.style.display = 'block'; // Show the next DiLi element
        }
    }

    // Initially hide all boxes and DiLi elements except the first one
    hideAllBoxes();
    document.querySelector('.box1').style.display = 'block'; // Show the first box
    document.getElementById('DiLi1').style.display = 'block'; // Show the first DiLi element
});
