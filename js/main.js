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
    const casesTabsRoot = document.querySelector('[data-cases-tabs]');

    if (casesTabsRoot) {
        const tabs = casesTabsRoot.querySelectorAll('.cases__body-tab');
        const slides = casesTabsRoot.querySelectorAll('.cases__slide');
        const categoryKeys = ['fop', 'tov', 'audits', 'recovery', 'registration', 'kik', 'optimization'];
        const getCasesLimit = () => (window.innerWidth > 1200 ? 9 : 6);

        let currentFilter = 'all';

        slides.forEach((slide, index) => {
            if (!slide.dataset.category) {
                slide.dataset.category = categoryKeys[index % categoryKeys.length];
            }
        });

        const applyCasesView = () => {
            const limit = getCasesLimit();
            let visibleCount = 0;

            slides.forEach((slide) => {
                const matchesCategory = currentFilter === 'all' || slide.dataset.category === currentFilter;
                const show = matchesCategory && visibleCount < limit;

                if (show) {
                    visibleCount += 1;
                }

                slide.classList.toggle('is-hidden', !show);
                slide.hidden = !show;
            });
        };

        const filterCases = (filter) => {
            currentFilter = filter;

            tabs.forEach((tab) => {
                const isActive = tab.dataset.casesTab === filter;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            applyCasesView();
        };

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                filterCases(tab.dataset.casesTab);
            });
        });

        const activeTab = casesTabsRoot.querySelector('.cases__body-tab.is-active');
        filterCases(activeTab?.dataset.casesTab || 'all');

        window.addEventListener('resize', applyCasesView, { passive: true });
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
    const teamSlider = document.querySelector('.team__swiper');

    if (!teamSlider) return;

    const prevBtn = teamSlider.querySelector('.team__nav-button--prev');
    const nextBtn = teamSlider.querySelector('.team__nav-button--next');
    const paginationEl = teamSlider.querySelector('.team__pagination');

    const updateTeamNav = (swiper) => {
        const canScroll = !swiper.isLocked && (swiper.allowSlideNext || swiper.allowSlidePrev);

        if (!canScroll) {
            prevBtn?.setAttribute('hidden', '');
            nextBtn?.setAttribute('hidden', '');
            paginationEl?.classList.add('is-hidden');
            return;
        }

        paginationEl?.classList.remove('is-hidden');
        prevBtn?.toggleAttribute('hidden', !swiper.allowSlidePrev);
        nextBtn?.toggleAttribute('hidden', !swiper.allowSlideNext);
    };

    const teamSwiper = new Swiper(teamSlider, {
        slidesPerView: 'auto',
        spaceBetween: 24,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        navigation: {
            prevEl: prevBtn,
            nextEl: nextBtn,
        },
        pagination: {
            el: paginationEl,
            clickable: true,
        },
        on: {
            init: updateTeamNav,
            update: updateTeamNav,
            slideChange: updateTeamNav,
            resize: updateTeamNav,
            reachBeginning: updateTeamNav,
            reachEnd: updateTeamNav,
            fromEdge: updateTeamNav,
            lock: updateTeamNav,
            unlock: updateTeamNav,
        },
    });

    window.addEventListener('load', () => {
        teamSwiper.update();
        updateTeamNav(teamSwiper);
    });
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
    const langDropdowns = document.querySelectorAll('[data-lang-dropdown]');
    const desktopDropdowns = document.querySelectorAll('.lang-dropdown--desktop');
    const mobileDropdowns = document.querySelectorAll('.lang-dropdown--menu');

    const setLangValue = (value) => {
        let shortLabel = '';

        langDropdowns.forEach((dropdown) => {
            const valueEl = dropdown.querySelector('.lang-dropdown__value');
            const options = dropdown.querySelectorAll('.lang-dropdown__option');

            options.forEach((option) => {
                const isSelected = option.dataset.value === value;
                option.classList.toggle('is-selected', isSelected);
                option.setAttribute('aria-selected', isSelected ? 'true' : 'false');

                if (isSelected) {
                    shortLabel = option.dataset.short || option.textContent.trim();
                }
            });

            if (valueEl && shortLabel) {
                valueEl.textContent = shortLabel;
            }
        });
    };

    const resetHeaderLangFocus = (headerLang) => {
        const focused = headerLang?.querySelector(':focus');
        focused?.blur();
    };

    desktopDropdowns.forEach((dropdown) => {
        const headerLang = dropdown.closest('.header__lang');
        const trigger = dropdown.querySelector('.lang-dropdown__trigger');
        const options = dropdown.querySelectorAll('.lang-dropdown__option');

        headerLang?.addEventListener('mouseenter', () => {
            headerLang.classList.add('is-active');
            trigger?.setAttribute('aria-expanded', 'true');
        });

        headerLang?.addEventListener('mouseleave', () => {
            headerLang.classList.remove('is-active');
            trigger?.setAttribute('aria-expanded', 'false');
            resetHeaderLangFocus(headerLang);
        });

        options.forEach((option) => {
            option.addEventListener('mousedown', (e) => {
                e.preventDefault();
            });

            option.addEventListener('click', () => {
                setLangValue(option.dataset.value);
                resetHeaderLangFocus(headerLang);
            });
        });
    });

    const closeLangDropdown = (dropdown) => {
        const trigger = dropdown.querySelector('.lang-dropdown__trigger');
        const menu = dropdown.querySelector('.lang-dropdown__menu');

        dropdown.classList.remove('is-open');
        trigger?.setAttribute('aria-expanded', 'false');
        if (menu) menu.hidden = true;
    };

    mobileDropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector('.lang-dropdown__trigger');
        const menu = dropdown.querySelector('.lang-dropdown__menu');
        const options = dropdown.querySelectorAll('.lang-dropdown__option');

        const openLangDropdown = () => {
            mobileDropdowns.forEach((item) => {
                if (item !== dropdown) closeLangDropdown(item);
            });

            dropdown.classList.add('is-open');
            trigger?.setAttribute('aria-expanded', 'true');
            if (menu) menu.hidden = false;
        };

        trigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdown.classList.contains('is-open')) {
                closeLangDropdown(dropdown);
            } else {
                openLangDropdown();
            }
        });

        options.forEach((option) => {
            option.addEventListener('click', () => {
                setLangValue(option.dataset.value);
                closeLangDropdown(dropdown);
            });
        });
    });

    document.addEventListener('click', () => {
        mobileDropdowns.forEach(closeLangDropdown);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            mobileDropdowns.forEach(closeLangDropdown);
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
    const fixedInfo = document.querySelector('.fixed-info');
    const isHomePage = Boolean(document.querySelector('main > section.hero'));
    const triggerSection = isHomePage
        ? document.querySelector('main > section:nth-of-type(3)')
        : null;

    const updateFixedInfoVisibility = () => {
        if (!fixedInfo) return;

        const show = triggerSection
            ? window.scrollY >= triggerSection.offsetTop - 120
            : true;

        const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
        const isAtBottom = scrollBottom <= 50;

        fixedInfo.classList.toggle('is-visible', show);
        fixedInfo.classList.toggle('is-at-bottom', show && isAtBottom);
        fixedInfo.setAttribute('aria-hidden', show ? 'false' : 'true');
    };

    if (fixedInfo) {
        fixedInfo.setAttribute('aria-hidden', isHomePage ? 'true' : 'false');
        updateFixedInfoVisibility();
        window.addEventListener('scroll', updateFixedInfoVisibility, { passive: true });
        window.addEventListener('resize', updateFixedInfoVisibility);
    }

    const btnTop = document.querySelector('.fixed-info__top-btn');
    
    btnTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const callBtn = document.querySelector('.hero__btn--primary');
    const modal = document.getElementById('callback-modal');

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

    const closeBtn = modal?.querySelector('.modal__close');
    closeBtn?.addEventListener('click', closeModal);

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
            closeModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq__accardion').forEach((accordion) => {
        const faqItems = accordion.querySelectorAll('.faq__accardion-item');

        faqItems.forEach((item) => {
            const btn = item.querySelector('.faq__accardion-title');
            const content = item.querySelector('.faq__accardion-content');

            if (!btn || !content) return;

            btn.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');

            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-active');

                faqItems.forEach((other) => {
                    if (other === item) return;

                    other.classList.remove('is-active');
                    other.querySelector('.faq__accardion-title')?.setAttribute('aria-expanded', 'false');
                    other.querySelector('.faq__accardion-content')?.setAttribute('aria-hidden', 'true');
                });

                item.classList.toggle('is-active', !isOpen);
                btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
                content.setAttribute('aria-hidden', !isOpen ? 'false' : 'true');
            });
        });

        const firstItem = faqItems[0];
        const firstBtn = firstItem?.querySelector('.faq__accardion-title');
        const firstContent = firstItem?.querySelector('.faq__accardion-content');

        if (!firstItem || !firstBtn || !firstContent) return;

        firstItem.classList.add('is-active');
        firstBtn.setAttribute('aria-expanded', 'true');
        firstContent.setAttribute('aria-hidden', 'false');
    });
});