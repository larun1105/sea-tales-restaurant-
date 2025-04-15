// var navLinks = document.getElementById("navLinks");

// function showMenu() {
//     navLinks.style.right = "0"
// }
// function hideMenu() {
//     navLinks.style.right = "-200px";
// }

// next

// function showMenu(action) {
//     let showMenu = document.querySelector(".ham");
//     let close = document.querySelector(".close")

//     if (action = "open") {
//         ham.classlist.add("open");
//         close.style.display = "block";
//         ham.style.display = "none";
//     }
//     else {
//         ham.classlist.remove("open");
//         close.style.display = "none";
//         ham.style.display = "block";
//     }
// }

let ham = document.querySelector(".ham");
let close = document.querySelector(".close");
let navlinks = document.querySelector(".nav-links");

function showMenu() {
  ham.style.display = "none";
  //   sidebar.style.display = "block";
  navlinks.style.display = "block";
}

function hideMenu() {
  ham.style.display = "block";
  //   sidebar.style.display = "block";
  navlinks.style.display = "none";
}

// popup display

document.addEventListener('DOMContentLoaded', function() {
    const fabBtn = document.getElementById('fabBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeBtn = document.querySelector('.close-btn');

    // Open popup when + button is clicked
    fabBtn.addEventListener('click', function() {
        popupOverlay.classList.add('active');
    });

    // Close popup when X button is clicked
    closeBtn.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
    });

    // Close popup when clicking outside the form
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });
});

// Mobile menu toggle
function showMenu() {
    document.getElementById('navLinks').style.right = "0";
}

function hideMenu() {
    document.getElementById('navLinks').style.right = "-200px";
}

// Booking form handling
document.addEventListener('DOMContentLoaded', function() {
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    const bookingFormContainer = document.getElementById('bookingFormContainer');
    const selectedPackageInput = document.getElementById('selectedPackage');
    const bookingForm = document.getElementById('bookingForm');
    
    // Handle book now button clicks
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            selectedPackageInput.value = packageName;
            bookingFormContainer.style.display = 'block';
            bookingFormContainer.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Close the form when clicking outside
    document.addEventListener('click', function(event) {
        if (!bookingFormContainer.contains(event.target) && 
            !Array.from(bookNowButtons).some(btn => btn.contains(event.target))) {
            bookingFormContainer.style.display = 'none';
        }
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendEmail();
    });
});

function sendEmail() {
    const formData = {
        text: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        tel: document.getElementById('phone').value.trim(),
        date: document.getElementById('date').value.trim(),
        time: document.getElementById('time').value.trim(),
        guests: document.getElementById('guests').value.trim(),
        message: document.getElementById('message').value.trim(),
        package: document.getElementById('selectedPackage').value.trim()
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.guests) {
        alert("Please fill in all required fields");
        return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert("Please enter a valid email address");
        return;
    }

    fetch('response.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        if (data.success) {
            document.getElementById('bookingForm').reset();
            document.getElementById('bookingFormContainer').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while submitting your booking");
    });
}a
// ---------contactpage---
    function openGoogleMaps() {
        window.open('https://maps.google.com/?q=Sea+Tales+Restaurant,+5/107,+Jagajeevanram+Ave,+Injambakkam,+Chennai,+Tamil+Nadu,+600115', '_blank');
    }
    
    function callRestaurant() {
        window.location.href = 'tel:+91904342424';
    }
    
    function openWhatsApp() {
        window.open('https://wa.me/91904342424', '_blank');
    }
    
    function openEmailClient() {
        window.location.href = 'mailto:larunprasathp11054@gmail.com';
    }
    
    function copyEmail() {
        navigator.clipboard.writeText('larunprasathp11054@gmail.com');
        alert('Email address copied to clipboard!');
    }
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally send the form data to your server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
