
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // petit délai en cascade pour les cartes (effet "stagger")
            setTimeout(() => {
            entry.target.classList.add('visible');
            }, index * 150);
            observer.unobserve(entry.target); // ne se déclenche qu'une fois
        }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));



  
    document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
    
        // Ferme tous les autres (comportement accordéon classique)
        document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0px');
        document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');
    
        if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
        }
    });
    });




    
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuBtn.querySelector('i');

    let isOpen = false;

    function openMenu() {
        navMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
            navMenu.classList.remove('opacity-0', '-translate-y-4');
            navMenu.classList.add('opacity-100', 'translate-y-0');
        });
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
        isOpen = true;
    }

    function closeMenu() {
        navMenu.classList.add('opacity-0', '-translate-y-4');
        navMenu.classList.remove('opacity-100', 'translate-y-0');
        setTimeout(() => navMenu.classList.add('hidden'), 300);
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        isOpen = false;
    }

    menuBtn.addEventListener('click', () => {
        isOpen ? closeMenu() : openMenu();
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen) closeMenu();
        });
    });

    document.addEventListener('click', (e) => {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnBtn = menuBtn.contains(e.target);
        if (isOpen && !isClickInsideNav && !isClickOnBtn) {
            closeMenu();
        }
    });
});