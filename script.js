const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        navbar.classList.remove('active'); 
    });
});

const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const navLink = document.querySelector(`.navbar a[href="#${id}"]`);
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Software Developer", "AI Enthusiast"];
const colorArray = ["#FF4C4C", "#A52A2A", "#A629F2"];
const typingDelay = 100, erasingDelay = 50, newTextDelay = 1500;
let textArrayIndex = 0, charIndex = 0;

function type() {
    typedTextSpan.style.color = colorArray[textArrayIndex];
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else setTimeout(erase, newTextDelay);
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

const scrollArrow = document.getElementById('scrollArrow');

scrollArrow.animate(
    [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(12px)' },
        { transform: 'translateY(0px)' }
    ],
    {
        duration: 1000,
        iterations: Infinity
    }
);

function updateArrow() {
    const scrollBottom = window.scrollY + window.innerHeight;
    const lastSection = sections[sections.length - 1];

    if (scrollBottom >= lastSection.offsetTop + lastSection.offsetHeight - 5) {

        scrollArrow.textContent = '▲';
        scrollArrow.dataset.direction = 'up';
    } else {

        scrollArrow.textContent = '▼';
        scrollArrow.dataset.direction = 'down';
    }
}

scrollArrow.addEventListener('click', () => {
    const currentScroll = window.scrollY;
    const buffer = 70; 

    if (scrollArrow.dataset.direction === 'up') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        let nextSection = null;

        for (let i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop - buffer > currentScroll + 5) {
                nextSection = sections[i];
                break;
            }
        }

        if (!nextSection) nextSection = sections[sections.length - 1]; // fallback
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Update arrow on scroll/load
window.addEventListener('scroll', updateArrow);
window.addEventListener('load', updateArrow);
