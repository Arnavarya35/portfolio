var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// SIDE-MENU FOR @MEDIAONLY DEVICES
var sidemenu = document.getElementById("sidemenu");
function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

// Spreadsheet Contact form
const scriptURL = 'https://script.google.com/macros/s/.../exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent Successfully";
            setTimeout(function() {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});

// CANVAS FLYING_JS
const canvas = document.getElementById('flyingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
function createParticle() {
    particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 5 + 1,
        speed: Math.random() * 3 + 1,
        direction: Math.random() * 2 * Math.PI
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const gradient = ctx.createLinearGradient(particle.x - particle.size, particle.y - particle.size, particle.x + particle.size, particle.y + particle.size);
        gradient.addColorStop(0, 'rgba(74, 144, 226, 0.9)'); 
        gradient.addColorStop(0.25, 'rgba(53, 122, 183, 0.9)'); 
        gradient.addColorStop(0.5, 'rgba(45, 105, 154, 0.9)'); 
        gradient.addColorStop(0.75, 'rgba(36, 87, 122, 0.9)'); 
        gradient.addColorStop(1, 'rgba(26, 69, 92, 0.9)'); 
        ctx.fillStyle = gradient;
        ctx.fill();
        particle.y -= particle.speed * Math.sin(particle.direction);
        particle.x += particle.speed * Math.cos(particle.direction);

        if (particle.y < 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animateParticles);
}
setInterval(createParticle, 100);
animateParticles();

document.addEventListener("DOMContentLoaded", () => {
    const projectElements = document.querySelectorAll('.projects');
    projectElements.forEach(project => {
        project.addEventListener('mouseover', () => {
            project.style.animationPlayState = 'paused';
        });

        project.addEventListener('mouseout', () => {
            project.style.animationPlayState = 'running';
        });
    });
});

// REGISTRATION FORM
// Cookie utility functions
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

function checkCookie(name) {
    return getCookie(name) !== '';
}

// Get modal element and buttons
const registerModal = document.getElementById("registerModal");
const registerBtn = document.getElementById("registerBtn");
const closeBtn = document.querySelector(".close");

// Open modal when Register button is clicked
registerBtn.addEventListener("click", () => {
    registerModal.style.display = "flex";
});

// Close modal when 'x' (close button) is clicked
closeBtn.addEventListener("click", () => {
    registerModal.style.display = "none";
});

// Close modal if user clicks outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target === registerModal) {
        registerModal.style.display = "none";
    }
});

// Handle registration form submission
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting immediately

    
    // Extract user input values
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const occupation = document.getElementById("occupation").value;

    // Set cookies for user data (set to expire in 30 days)
    setCookie("fullName", fullName, 30);
    setCookie("email", email, 30);

    //// Optionally, you can now submit the form if you're not using AJAX
    //registrationForm.submit();

    // Send data via AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "register.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText); // Display success message
            registerModal.style.display = "none"; // Close modal
        }
    };

    const data = JSON.stringify({
        fullName,
        email,
        username,
        password,
        phone,
        occupation
    });
    xhr.send(data);

    /*
    const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        occupation: document.getElementById("occupation").value,
    };

    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    */
});

// Check for existing cookie
if (checkCookie("fullName")) {
    const userName = getCookie("fullName");
    console.log("Welcome back, " + userName + "!");
}
