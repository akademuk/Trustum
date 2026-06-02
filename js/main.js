const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 70) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('mobile-menu');
    const btnOpen = document.querySelector('.burger'); 
    const btnClose = document.getElementById('menu-close-btn');
    const btnBack = document.getElementById('menu-back-btn');
    const overlay = document.querySelector('.mobile-menu__overlay');
    const triggers = document.querySelectorAll('.mobile-menu__trigger');
    const panelMain = document.getElementById('panel-main');

    let activeSubPanelId = null;

    const openMenu = () => {
        menu.classList.add('is-open');
        document.body.classList.add('no-scroll'); 
    };

    const closeMenu = () => {
        menu.classList.remove('is-open');
        document.body.classList.remove('no-scroll');

        setTimeout(() => {
            if (activeSubPanelId) {
                document.getElementById(activeSubPanelId).classList.remove('is-active');
                activeSubPanelId = null;
            }
            
            if (panelMain) panelMain.classList.add('is-active');
            
            btnBack.classList.add('is-hidden');
            triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
        }, 300);
    };

    btnOpen?.addEventListener('click', openMenu);
    btnClose?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);

            if (targetPanel) {
                if (activeSubPanelId && activeSubPanelId !== targetId) {
                    const oldPanel = document.getElementById(activeSubPanelId);
                    const oldTrigger = document.querySelector(`[data-target="${activeSubPanelId}"]`);
                    
                    if (oldPanel) oldPanel.classList.remove('is-active');
                    if (oldTrigger) oldTrigger.setAttribute('aria-expanded', 'false');
                }

                if (panelMain) panelMain.classList.remove('is-active');

                targetPanel.classList.add('is-active');
                trigger.setAttribute('aria-expanded', 'true');
                btnBack.classList.remove('is-hidden');
                activeSubPanelId = targetId;
            }
        });
    });

    btnBack?.addEventListener('click', () => {
        if (activeSubPanelId) {
            const activePanel = document.getElementById(activeSubPanelId);
            activePanel.classList.remove('is-active');

            const trigger = document.querySelector(`[data-target="${activeSubPanelId}"]`);
            if (trigger) trigger.setAttribute('aria-expanded', 'false');

            btnBack.classList.add('is-hidden');
            activeSubPanelId = null;

            if (panelMain) panelMain.classList.add('is-active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    const casesSlider = document.querySelector('.cases__swiper');
    
    if (casesSlider) {
        new Swiper(casesSlider, {
            slidesPerView: 'auto',
            spaceBetween: 24,
            centeredSlides: true,
            watchOverflow: true, 
            
            pagination: {
                el: '.cases__pagination',
                clickable: true,
            },

            breakpoints: {
                768: {
                    centeredSlides: false,
                },
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const casesSlider = document.querySelector('.reviews__swiper');
    
    if (casesSlider) {
        new Swiper(casesSlider, {
            slidesPerView: 'auto',
            spaceBetween: 24,
            centeredSlides: true,
            watchOverflow: true, 
            
            pagination: {
                el: '.reviews__pagination',
                clickable: true,
            },

            breakpoints: {
                768: {
                    centeredSlides: false,
                },
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const footerButtons = document.querySelectorAll('.footer__title');

    footerButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth >= 768) return;

            const col = button.closest('.footer__col');
            const list = col.querySelector('.footer__list');
            const isOpen = col.classList.contains('is-open');

            if (isOpen) {
                col.classList.remove('is-open');
                list.style.maxHeight = null;
                button.setAttribute('aria-expanded', 'false');
            } else {
                col.classList.add('is-open');
                list.style.maxHeight = list.scrollHeight + 'px';
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            document.querySelectorAll('.footer__col').forEach(col => {
                col.classList.remove('is-open');
                col.querySelector('.footer__list').style.maxHeight = null;
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,    
        offset: 100,   
        duration: 800, 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const btnTop = document.querySelector('.fixed-info__top-btn');
    
    btnTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const callBtn = document.querySelector('.fixed-info__call-btn');
    const modal = document.getElementById('callback-modal');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    const openModal = () => {
        if (!modal) return;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    };

    callBtn?.addEventListener('click', openModal);

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target === btn) {
                closeModal();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
            closeModal();
        }
    });
});