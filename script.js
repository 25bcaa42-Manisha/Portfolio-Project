console.log("JS is working");
const formMessage = document.getElementById('form-message');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate progress bars when skills section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Staggered fade-in animation for home elements
const fadeElements = document.querySelectorAll('.fade-in');
const observerFade = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.2}s`;
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observerFade.observe(el));

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    console.log("Form submitted");
    
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    
    let isValid = true;
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    console.log("Data:", name, email, message);
    
    if (name.length < 2) {
        document.querySelector('#name ~ .error').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.querySelector('#email ~ .error').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (message.length < 10) {
        document.querySelector('#message ~ .error').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }

    if (isValid) {
        console.log("Sending to server...");
        
    fetch('https://portfolio-project-oke6.onrender.com/add-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
        .then(res => res.text())
        .then(data => {
            console.log("Server response:", data);
            formMessage.textContent = data;
            formMessage.className = 'form-message success';
            contactForm.reset();
        })
        .catch(err => {
            console.error("Fetch error:", err);
            formMessage.textContent = "Error sending data!";
        });
    }
});

document.querySelector('.resume-button').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Resume download feature - Please replace with actual resume file link');
});

const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});
