// Toggle menu for mobile view
function toggleMenu() {
    const nav = document.querySelector('header nav');
    nav.classList.toggle('active');
}

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky Navigation Bar (Appears when scrolled)
window.onscroll = function() { stickNav(); };
const header = document.querySelector('.header');
let sticky = header.offsetTop;

function stickNav() {
    if (window.pageYOffset > sticky) {
        header.style.top = "0";
    } else {
        header.style.top = "-100px";
    }

    // Show the back-to-top button when scrolled down
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.pageYOffset > 500) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }

    // Highlight active section in nav
    let currentSection = '';
    document.querySelectorAll('section').forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    document.querySelectorAll('header nav a').forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active-link');
        }
    });
}

// Show modal when sign-up button is clicked
const signUpButton = document.querySelector('.btn');
signUpButton.addEventListener('click', function() {
    showModal();
});

function showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Sign Up</h2>
            <form>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Close the modal
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.remove();
    });

    // Submit the form (add validation if needed)
    modal.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = modal.querySelector('#email').value;
        if (validateEmail(email)) {
            alert('You have successfully signed up!');
            modal.remove();
        } else {
            alert('Please enter a valid email.');
        }
    });
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Back-to-top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.classList.add('back-to-top');
backToTopButton.innerHTML = '↑';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hover effects on navigation links
const navLinks = document.querySelectorAll('header nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
        link.style.color = '#007bff';
    });
    link.addEventListener('mouseout', function() {
        link.style.color = '';
    });
});
