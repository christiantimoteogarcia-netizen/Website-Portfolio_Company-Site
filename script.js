const menuOpenButton = document.querySelector ("#menu-open-button");
const menuCloseButton = document.querySelector ("#menu-close-button");

menuOpenButton.addEventListener ("click", () => {
    // Toggle mobile menu visibility 
    document.body.classList.toggle ("show-mobile-menu")
});

// Toggle mobile menu visibility
menuCloseButton.addEventListener ("click", () => { 
    menuOpenButton.click ()
});

// Product section
let slideIndexes = {};
        function moveSlide(sliderId, step) {
            if (!slideIndexes[sliderId]) slideIndexes[sliderId] = 0;
            const slider = document.getElementById(sliderId);
            const slides = slider.querySelectorAll('.slide');
            slideIndexes[sliderId] += step;
            if (slideIndexes[sliderId] >= slides.length) { slideIndexes[sliderId] = 0; }
            if (slideIndexes[sliderId] < 0) { slideIndexes[sliderId] = slides.length - 1; }
            slider.style.transform = `translateX(${-slideIndexes[sliderId] * 100}%)`;
        }

// About Us section
document.addEventListener('DOMContentLoaded', () => {
   
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
   
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    

    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = window.scrollY;
    });

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };
    

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    

    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const parallaxSection = document.querySelector('.parallax-section');
            const sectionTop = parallaxSection.offsetTop;
            const sectionBottom = sectionTop + parallaxSection.offsetHeight;
            
            if (scrollPosition >= sectionTop - window.innerHeight && scrollPosition <= sectionBottom) {
                const speed = 0.5;
                const yPos = (scrollPosition - sectionTop) * speed;
                parallaxBg.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    

    const navItems = document.querySelectorAll('.nav-links a, .footer-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });

                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            }
        });
    });
    

    const cardImages = document.querySelectorAll('.card-image img');
    
    cardImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    const body = document.body;
    body.classList.add('loaded');
    

    const animateInElements = document.querySelectorAll('.animate-in');
    
    animateInElements.forEach((element, index) => {
        element.style.animationDelay = `${0.2 + (index * 0.2)}s`;
        element.style.animation = 'fadeUp 1s forwards';
    });
});

// Map section
document.addEventListener('DOMContentLoaded', function() {
    
    setTimeout(() => {
        const markers = document.querySelectorAll('.marker');
        markers.forEach((marker, index) => {
            setTimeout(() => {
                marker.style.opacity = '1';
            }, index * 200);
        });
    }, 1000);
    

    let activeBuilding = null;
    let isTransitioning = false;
    
    const hoverAreas = document.querySelectorAll('.hover-area');
    hoverAreas.forEach(area => {
        area.addEventListener('click', function() {
            if (isTransitioning) return;
            
            const building = this.getAttribute('data-building');
            toggleBuilding(building);
        });
        
        area.addEventListener('mouseenter', function() {
            const building = this.getAttribute('data-building');
            highlightBuilding(building, true);
        });
        
        area.addEventListener('mouseleave', function() {
            const building = this.getAttribute('data-building');
            if (building !== activeBuilding) {
                highlightBuilding(building, false);
            }
        });
    });
    
  
    function highlightBuilding(building, isHighlighted) {
        const hoverArea = document.getElementById(`building-${building}`);
        const marker = document.querySelector(`.marker[data-building="${building}"]`);
        
        if (isHighlighted) {
            hoverArea.classList.add('highlight');
            if (marker) marker.style.animation = 'pulse 1s infinite';
        } else {
            hoverArea.classList.remove('highlight');
            if (marker) marker.style.animation = 'pulse 2s infinite';
        }
    }
    

    function toggleBuilding(building) {
        const infoPanel = document.getElementById(`info-${building}`);
        const hoverArea = document.getElementById(`building-${building}`);
        const mapContainer = document.querySelector('.map-container');
        const companyMap = document.querySelector('.company-map');
        
        isTransitioning = true;
       
        if (activeBuilding === building) {
            closeActivePanel();
            return;
        }
        

        if (activeBuilding) {
            const activePanel = document.getElementById(`info-${activeBuilding}`);
            const activeArea = document.getElementById(`building-${activeBuilding}`);
            
            activePanel.classList.remove('active');
            activeArea.classList.remove('active');
            
            setTimeout(() => {
                activePanel.style.display = 'none';
                openNewPanel();
            }, 300);
        } else {
            openNewPanel();
        }
        
        function openNewPanel() {
     
            activeBuilding = building;
            
      
            hoverArea.classList.add('active');
            companyMap.classList.add('active-map');
            
         
            applySpotlightEffect(building);
            
            infoPanel.style.display = 'block';
            setTimeout(() => {
                infoPanel.classList.add('active');
                isTransitioning = false;
            }, 50);
        }
    }
    
   
    function closeActivePanel() {
        if (!activeBuilding) return;
        
        const activePanel = document.getElementById(`info-${activeBuilding}`);
        const activeArea = document.getElementById(`building-${activeBuilding}`);
        const companyMap = document.querySelector('.company-map');
        
        activePanel.classList.remove('active');
        activeArea.classList.remove('active');
        companyMap.classList.remove('active-map');
        
        removeSpotlightEffect();
        
        setTimeout(() => {
            activePanel.style.display = 'none';
            activeBuilding = null;
            isTransitioning = false;
        }, 300);
    }
    
  
    function applySpotlightEffect(building) {
       
        removeSpotlightEffect();
        
    
        const mapContainer = document.querySelector('.map-container');
        const spotlight = document.createElement('div');
        spotlight.className = 'spotlight';
        spotlight.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                circle at var(--x) var(--y),
                transparent 100px,
                rgba(10, 25, 47, 0.7) 200px
            );
            pointer-events: none;
            z-index: 10;
            transition: opacity 0.5s ease;
        `;
        
        mapContainer.appendChild(spotlight);
        
       
        let spotlightX, spotlightY;
        
        switch(building) {
            case 'a':
                spotlightX = '195px';
                spotlightY = '200px';
                break;
            case 'b':
                spotlightX = '370px';
                spotlightY = '200px';
                break;
            case 'c':
                spotlightX = '190px';
                spotlightY = '440px';
                break;
            case 'e':
                spotlightX = '350px';
                spotlightY = '565px';
                break;
        }
        
        spotlight.style.setProperty('--x', spotlightX);
        spotlight.style.setProperty('--y', spotlightY);
    }
    
 
    function removeSpotlightEffect() {
        const spotlight = document.querySelector('.spotlight');
        if (spotlight) {
            spotlight.style.opacity = '0';
            setTimeout(() => {
                spotlight.remove();
            }, 500);
        }
    }
    
  
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeActivePanel();
        } else if (e.key >= '1' && e.key <= '4') {
            const buildingIndex = parseInt(e.key) - 1;
            const buildings = ['a', 'b', 'c', 'e'];
            if (buildingIndex < buildings.length) {
                toggleBuilding(buildings[buildingIndex]);
            }
        }
    });
    
    
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    
    const mapContainer = document.querySelector('.map-container');
    
    mapContainer.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('hover-area')) return;
        
        isDragging = true;
        startX = e.pageX - mapContainer.offsetLeft;
        startY = e.pageY - mapContainer.offsetTop;
        scrollLeft = mapContainer.scrollLeft;
        scrollTop = mapContainer.scrollTop;
        
        mapContainer.style.cursor = 'grabbing';
    });
    
    mapContainer.addEventListener('mouseleave', function() {
        isDragging = false;
        mapContainer.style.cursor = 'grab';
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        mapContainer.style.cursor = 'grab';
    });
    
    mapContainer.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const x = e.pageX - mapContainer.offsetLeft;
        const y = e.pageY - mapContainer.offsetTop;
        
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        
        mapContainer.scrollLeft = scrollLeft - walkX;
        mapContainer.scrollTop = scrollTop - walkY;
    });
    
  
    mapContainer.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('hover-area')) return;
        
        isDragging = true;
        startX = e.touches[0].pageX - mapContainer.offsetLeft;
        startY = e.touches[0].pageY - mapContainer.offsetTop;
        scrollLeft = mapContainer.scrollLeft;
        scrollTop = mapContainer.scrollTop;
    });
    
    mapContainer.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    mapContainer.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const x = e.touches[0].pageX - mapContainer.offsetLeft;
        const y = e.touches[0].pageY - mapContainer.offsetTop;
        
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        
        mapContainer.scrollLeft = scrollLeft - walkX;
        mapContainer.scrollTop = scrollTop - walkY;
    });
    
  
    animateMapLoad();
    
    function animateMapLoad() {
        const buildings = ['a', 'b', 'c', 'e'];
        
        buildings.forEach((building, index) => {
            setTimeout(() => {
                const area = document.getElementById(`building-${building}`);
                area.style.opacity = '0';
                area.style.transform = 'scale(0.9)';
                area.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    area.style.opacity = '1';
                    area.style.transform = 'scale(1)';
                }, 50);
            }, index * 200 + 500);
        });
    }
    

    addFloatingEffect();
    
    function addFloatingEffect() {
        const markers = document.querySelectorAll('.marker');
        
        markers.forEach(marker => {
  
            const duration = 3 + Math.random() * 2;
            const delay = Math.random() * 2;
            
            marker.style.animation = `pulse 2s infinite, float ${duration}s ease-in-out ${delay}s infinite alternate`;
        });
        
   
        if (!document.querySelector('#float-animation')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'float-animation';
            styleSheet.textContent = `
                @keyframes float {
                    0% { transform: translate(-50%, -50%) translateY(0); }
                    100% { transform: translate(-50%, -50%) translateY(-10px); }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
});
