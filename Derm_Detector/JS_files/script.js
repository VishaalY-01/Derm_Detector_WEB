const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle between sign-in and sign-up
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
/* <img src="Profile.svg" alt="Profile" style="width:4vw; height: 4vw;"></img> */

// script.js
$(document).ready(function() {
    // Handle the signup form submission
    $('#signupForm').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        $.ajax({
            url: 'http://127.0.0.1:3000/signup',
            type: 'POST',
            data: $(this).serialize(), // Serialize form data
            success: function(response) {
                alert(response.message); // Show success message
                $('#login').click(); // Programmatically click the login button
            },
            error: function(error) {
                alert('Error: ' + error.responseJSON.message); // Show error message
            }
        });
    });

    // Handle the login form submission

// Function to load external scripts dynamically
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error: ${url}`));
        document.head.appendChild(script);
    });
}

// Load the js-cookie library
loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-cookie/3.0.1/js.cookie.min.js')
    .then(() => {
        console.log('js-cookie library loaded');
        handleLogin();
    })
    .catch((error) => {
        console.error(error);
    });

// Function to handle login
// Function to handle login
function handleLogin() {
    $('form[action="http://127.0.0.1:3000/login"]').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        $.ajax({
            url: 'http://127.0.0.1:3000/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                alert(response.message); // Show login success message

                // Store session data in localStorage
                localStorage.setItem('userEmail', response.user.email);
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('userName', response.user.name);
                localStorage.setItem('userCity', response.user.city);

                // Close the modal if the function exists in the parent window
                if (typeof window.parent.closeLoginModal === 'function') {
                    window.parent.closeLoginModal();
                }

                // Reload the parent page after closing the modal
                setTimeout(() => {
                    window.parent.location.reload();
                }, 500); // Delay to ensure modal has closed before reloading
            },
            error: function(error) {
                alert('Error: ' + error.responseJSON.message);
            }
        });
    });
}


// Function to sign out
function signOut() {
    Cookies.remove('userEmail');
    Cookies.remove('session');
    Cookies.remove('isLoggedIn');
    window.parent.location.reload(); // Reload the parent window to update navbar
}
// Make sure to check if the script is already loaded if you're calling loadScript multiple times
});

// const SignForm = document.getElementById('signupForm');
// const LoginForm = document.getElementById('loginForm');

// // Handle Signup Form Submission
// SignForm.addEventListener('submit', async function (event) {
//     event.preventDefault();
//     console.log("Yes")
//       let a = await fetch("/signup")
//       let r = await a.json()
//       console.log(r)
// });

// // Handle Login Form Submission
// LoginForm.addEventListener('submit', async function (event) {
//     event.preventDefault();
//     console.log("Yes")
//       let a = await fetch("/login")
//       let r = await a.json()
//       console.log(r)
//     // const formData = new FormData(LoginForm);

//     // try {
//     //     const response = await fetch('/login', {
//     //         method: 'POST',
//     //         body: formData
//     //     });

//     //     if (response.headers.get('Content-Type')?.includes('application/json')) {
//     //         const result = await response.json();

//     //         if (result.success) {
//     //             alert(result.message); // Login successful
//     //             const modal = document.getElementById('container'); // Adjust ID as needed
//     //             modal.style.display = 'none'; // Close the login modal
//     //         } else {
//     //             alert(result.message); // Show error message
//     //         }
//     //     } else {
//     //         // Handle non-JSON response (like an HTML error page)
//     //         const text = await response.text();
//     //         console.error('Non-JSON response received:', text);
//     //         alert('Unexpected error: Please check the server response.');
//     //     }
//     // } catch (error) {
//     //     console.error('Error:', error);
//     //     alert('An error occurred. Please try again.');
//     // }
// });
