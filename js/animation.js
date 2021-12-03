// Check whether an element is in the viewport
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom + 100 <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Underline and fade in animation
function Animations() {
    const underlines = document.querySelectorAll('.underline');
    underlines.forEach(underline => {
        if (isInView(underline)) {
            underline.style.width = "120%";
        }
    });

    const fadeIns = document.querySelectorAll('.fade-in');
    fadeIns.forEach(fadeIn => {
        if (isInView(fadeIn)) {
            fadeIn.style.opacity = 1;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    Animations();
});

document.addEventListener('scroll', () => {
    Animations();
});
