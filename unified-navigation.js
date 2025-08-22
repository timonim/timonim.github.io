// Unified Navigation System
// This single file manages all navigation across the entire site

const projectList = [
  {
    name: "Flytrex",
    path: "Flytrex/Flytrex.html",
    title: "Elevating User Experience: Multi-Platform UI/UX Design for Flytrex's Drone Delivery Ecosystem"
  },
  {
    name: "Tidbit",
    path: "https://portnoytim.com/Tidbit/",
    title: "Digital calm, always in sight — MagSafe E-ink display for focused living",
    external: true
  },
  {
    name: "Fanbase",
    path: "Fanbase/Fanbase.html",
    title: "Reimagining Music Sharing and Community Building within Spotify's Ecosystem"
  },
  {
    name: "Rubato",
    path: "Rubato/Rubato.html",
    title: "Tuning the User Interface for Discerning Audio Equipment Shoppers"
  },
  {
    name: "Obituary Generator",
    path: "Obituary/Obituary.html",
    title: "Creating Heartfelt Obituaries: An Intuitive Online Generator for Personal Tributes"
  },
  {
    name: "Steps.org.il",
    path: "Steps.org.il/Steps.html",
    title: "Designing a Digital Haven for Ex-Orthodox Custody Battles"
  },
  {
    name: "Typography",
    path: "Typography/Typo.html",
    title: "Beyond Letters: Pushing Boundaries in Hebrew Type Design"
  },
  // {
  //   name: "Beers",
  //   path: "Beers/Beers.html",
  //   title: "Crafting Beers and Labels"
  // },
  // {
  //   name: "Locu",
  //   path: "Locu-compressed/locu.html",
  //   title: "Branding and Packaging for Grasshopper Protein Supplements"
  // },
  // {
  //   name: "Pharmocann",
  //   path: "Pharmocann/Pharmocann.html",
  //   title: "Medical Cannabis Branding and Packaging"
  // },
  // {
  //   name: "Nebula Trollz",
  //   path: "Nebula Trollz/Trollz.html",
  //   title: "NFT Collection Design and Development"
  // }
];

// Context Detection
function isHomePage() {
  const path = window.location.pathname;
  return path === '/' || path === '/index.html' || path.endsWith('/index.html');
}

function isProjectPage() {
  return getCurrentProjectIndex() !== -1;
}

function getCurrentProjectIndex() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop();
  
  for (let i = 0; i < projectList.length; i++) {
    const project = projectList[i];
    if (project.external) continue;
    
    const projectFile = project.path.split('/').pop();
    if (currentPath.includes(project.path) || currentFile === projectFile) {
      return i;
    }
  }
  return -1;
}

function getNavigationData() {
  const currentIndex = getCurrentProjectIndex();
  const internalProjects = projectList.filter(p => !p.external);
  
  // If not on a project page, return all projects without navigation
  if (currentIndex === -1) {
    return {
      current: null,
      previous: null,
      next: null,
      allProjects: internalProjects
    };
  }
  
  // On a project page, include navigation between projects
  const currentInternalIndex = internalProjects.findIndex(p => p.name === projectList[currentIndex].name);
  const prevIndex = currentInternalIndex > 0 ? currentInternalIndex - 1 : internalProjects.length - 1;
  const nextIndex = currentInternalIndex < internalProjects.length - 1 ? currentInternalIndex + 1 : 0;
  
  return {
    current: internalProjects[currentInternalIndex],
    previous: internalProjects[prevIndex],
    next: internalProjects[nextIndex],
    allProjects: internalProjects
  };
}

// Build menu list with Tidbit (external) as the second item
function getMenuProjects(navData) {
  const internals = (navData ? navData.allProjects : projectList.filter(p => !p.external)).slice();
  const externals = projectList.filter(p => p.external);
  const tidbit = externals.find(p => p.name === 'Tidbit');
  const otherExternals = externals.filter(p => p !== tidbit);

  const result = [];
  if (internals.length > 0) {
    // First internal
    result.push(internals[0]);
    // Insert Tidbit as second, if exists
    if (tidbit) result.push(tidbit);
    // Remaining internal projects
    result.push(...internals.slice(1));
  }

  // Append any remaining externals at the end (if any)
  if (otherExternals.length) {
    result.push(...otherExternals);
  }

  // If there were no internals, still include Tidbit first
  if (!internals.length && tidbit) {
    result.unshift(tidbit);
  }

  return result;
}

// Navigation Generation
function createUnifiedNavigation() {
  const isHome = isHomePage();
  const isProject = isProjectPage();
  
  // Determine logo and home paths based on context
  const logoPath = "/images main/Logo Tet.svg";
  const homePath = "/index.html";
  
  if (isHome) {
    // Homepage: Simple header-style navigation
    return `
      <nav class="unified-navigation homepage-nav" id="unified-navigation" role="navigation" aria-label="Site">
        <div class="nav-container">
          <a href="${homePath}" class="logo-link">
            <img
              src="${logoPath}"
              alt="Logo for Tim Portnoy's design portfolio"
              class="logo-image"
              id="logo"
            />
          </a>
          
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <a href="mailto:portnoytim@gmail.com" class="contact-link">
            <button class="secondary-button">
              <span class="material-symbols-outlined">mail</span>
              <span class="button-text">Let's talk</span>
            </button>
          </a>
        </div>
      </nav>
    `;
  } else if (isProject) {
    // Project pages: Full project navigation with controls
    const navData = getNavigationData();
    if (!navData) return '';
    
    return `
      <nav class="unified-navigation project-nav" id="unified-navigation" role="navigation" aria-label="Project navigation">
        <div class="nav-container">
          <a href="${homePath}" class="logo-link">
            <img
              src="${logoPath}"
              alt="Logo for Tim Portnoy's design portfolio"
              class="logo-image"
              id="logo"
            />
          </a>
          
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div class="project-nav-controls">
            <a href="/${navData.previous.path}" class="nav-link prev-next-link tertiary-button" title="${navData.previous.title}">
              <span class="material-symbols-outlined">chevron_left</span>
              <div class="nav-text">
                <span class="nav-label">Previous</span>
                <span class="nav-project-name">${navData.previous.name}</span>
              </div>
            </a>
            
            <a href="/${navData.next.path}" class="nav-link prev-next-link tertiary-button" title="${navData.next.title}">
              <div class="nav-text">
                <span class="nav-label">Next</span>
                <span class="nav-project-name">${navData.next.name}</span>
              </div>
              <span class="material-symbols-outlined">chevron_right</span>
            </a>
          </div>
          
          <div class="nav-right-section">
            <div class="projects-dropdown">
              <button class="dropdown-toggle ghost-button" id="projects-dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="projects-dropdown-menu">
                <span class="material-symbols-outlined">apps</span>
                <span class="dropdown-text">Projects</span>
                <span class="material-symbols-outlined">expand_more</span>
              </button>
              <div class="dropdown-menu" id="projects-dropdown-menu" role="menu">
                ${getMenuProjects(navData).map(p => {
                  const isExternal = !!p.external;
                  const isActive = !isExternal && p.name === navData.current.name;
                  const href = isExternal ? p.path : `/${p.path}`;
                  const extra = isExternal ? ' target="_blank" rel="noopener noreferrer"' : (isActive ? ' aria-current="page"' : '');
                  return `
                    <a href="${href}" class="dropdown-item ${isActive ? 'active' : ''}" role="menuitem" tabindex="-1"${extra}>
                      <span class="project-name">${p.name}</span>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
            
            <a href="mailto:portnoytim@gmail.com" class="contact-link">
              <button class="secondary-button">
                <span class="material-symbols-outlined">mail</span>
                <span class="button-text">Let's talk</span>
              </button>
            </a>
          </div>
        </div>
      </nav>
    `;
  } else {
    // Simple pages (about, etc.): Navigation with projects dropdown
    const navData = getNavigationData();
    
    return `
      <nav class="unified-navigation simple-nav" id="unified-navigation" role="navigation" aria-label="Main navigation">
        <div class="nav-container">
          <a href="${homePath}" class="logo-link">
            <img
              src="${logoPath}"
              alt="Logo for Tim Portnoy's design portfolio"
              class="logo-image"
              id="logo"
            />
          </a>
          
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div class="nav-right-section">
            ${navData ? `
              <div class="projects-dropdown">
                <button class="dropdown-toggle ghost-button" id="projects-dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="projects-dropdown-menu">
                  <span class="material-symbols-outlined">apps</span>
                  <span class="dropdown-text">Projects</span>
                  <span class="material-symbols-outlined">expand_more</span>
                </button>
                <div class="dropdown-menu" id="projects-dropdown-menu" role="menu">
                  ${getMenuProjects(navData).map(p => {
                    const isExternal = !!p.external;
                    const href = isExternal ? p.path : `/${p.path}`;
                    const extra = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
                    return `
                      <a href="${href}" class="dropdown-item" role="menuitem" tabindex="-1"${extra}>
                        <span class="project-name">${p.name}</span>
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}
            
            <a href="mailto:portnoytim@gmail.com" class="contact-link">
              <button class="secondary-button">
                <span class="material-symbols-outlined">mail</span>
                <span class="button-text">Let's talk</span>
              </button>
            </a>
          </div>
        </div>
      </nav>
    `;
  }
}

// Event Listeners and Interactions
function initializeDropdown() {
  // Initialize wherever the dropdown exists (project pages and simple pages like About)
  const dropdownToggle = document.getElementById('projects-dropdown-toggle');
  const dropdownMenu = document.getElementById('projects-dropdown-menu');
  
  if (dropdownToggle && dropdownMenu) {
    // Dropdown toggle
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownMenu.classList.toggle('show');
      dropdownToggle.classList.toggle('active');
      const isOpen = dropdownMenu.classList.contains('show');
      dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      // If click is outside both the toggle and the menu, close
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        dropdownToggle.classList.remove('active');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close with Escape when open
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        dropdownToggle.classList.remove('active');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownToggle.focus();
      }
    });
  }
}

function initializeScrollBehavior() {
  const navElement = document.querySelector('.unified-navigation');
  if (navElement) {
    let lastScrollTop = 0;
    let isTicking = false;
    let isHovering = false; // kept for potential future hover-specific tweaks
    let hideTimeoutId = null; // no longer used on desktop
    const hideDelay = 300; // mobile keep slight debounce
    const desktopBreakpoint = 1024;
    const topEdgeRevealPx = 14; // reveal when cursor is within this distance from top
    let lastRevealTs = 0;
    const revealThrottleMs = 120;
    
    // Hysteresis thresholds to prevent flickering
    const compactEnterThreshold = 60; // Enter compact mode at 60px
    const compactExitThreshold = 30;  // Exit compact mode at 30px
    let isCompact = false;

    navElement.addEventListener('mouseenter', () => {
      if (window.innerWidth >= desktopBreakpoint) {
        isHovering = true;
        if (hideTimeoutId) {
          clearTimeout(hideTimeoutId);
          hideTimeoutId = null;
        }
        navElement.classList.remove('hide');
        navElement.classList.add('show');
      }
    });

    navElement.addEventListener('mouseleave', () => {
      if (window.innerWidth >= desktopBreakpoint) {
        isHovering = false;
      }
    });

    window.addEventListener('scroll', () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          isTicking = false;
          const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const isDesktop = window.innerWidth >= desktopBreakpoint;

          if (isDesktop) {
            // Desktop behavior: never hide; condense when scrolled with hysteresis
            if (!isCompact && currentScrollTop > compactEnterThreshold) {
              isCompact = true;
              navElement.classList.add('compact');
            } else if (isCompact && currentScrollTop < compactExitThreshold) {
              isCompact = false;
              navElement.classList.remove('compact');
            }
            navElement.classList.remove('hide');
            navElement.classList.add('show');
          } else {
            // Mobile behavior: hide on scroll down, show on scroll up
            if (hideTimeoutId) {
              clearTimeout(hideTimeoutId);
              hideTimeoutId = null;
            }
            if (currentScrollTop > lastScrollTop) {
              // Scrolling Down
              if (currentScrollTop > 10) {
                hideTimeoutId = setTimeout(() => {
                  navElement.classList.add('hide');
                  navElement.classList.remove('show');
                  hideTimeoutId = null;
                }, hideDelay);
              }
            } else if (currentScrollTop < lastScrollTop) {
              // Scrolling Up
              navElement.classList.remove('hide');
              navElement.classList.add('show');
            }
          }

          lastScrollTop = Math.max(0, currentScrollTop);
        });
        isTicking = true;
      }
    });

    // Reveal when cursor approaches top edge (helps when nav is fully offscreen)
    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth < desktopBreakpoint) return; // desktop-only behavior
      const now = performance.now();
      if (now - lastRevealTs < revealThrottleMs) return;
      lastRevealTs = now;
      if (e.clientY <= topEdgeRevealPx) {
        navElement.classList.remove('hide');
        navElement.classList.add('show');
      }
    });

    // Initial state: make sure header is visible; apply compact if needed on desktop
    const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerWidth >= desktopBreakpoint) {
      navElement.classList.remove('hide');
      navElement.classList.add('show');
      if (initialScrollTop > compactEnterThreshold) {
        isCompact = true;
        navElement.classList.add('compact');
      }
    } else {
      if (initialScrollTop > 10) {
        navElement.classList.add('hide');
      } else {
        navElement.classList.remove('hide');
        navElement.classList.add('show');
      }
    }
    lastScrollTop = Math.max(0, initialScrollTop);
  }
}

// Logo Animation (enhanced from original header-script.js)
function initLogoAnimation(logoElement, logoLink) {
  if (!logoElement || !logoLink) return;

  // Enhanced logo hover effect
  logoLink.addEventListener('mouseenter', () => {
    logoElement.style.transform = 'scale(1.1) rotate(5deg)';
  });

  logoLink.addEventListener('mouseleave', () => {
    logoElement.style.transform = 'scale(1) rotate(0deg)';
  });

  // Click animation
  logoLink.addEventListener('click', () => {
    logoElement.style.transform = 'scale(0.95) rotate(-2deg)';
    setTimeout(() => {
      logoElement.style.transform = 'scale(1) rotate(0deg)';
    }, 150);
  });
}

// Simplified Mobile Menu Class
class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.toggleButton = null;
    this.container = null;
    this.sheetPanel = null;
    this.projectsToggle = null;
    this.projectsMenu = null;
    this.eventListeners = [];
    
    // Touch drag properties
    this.isDragging = false;
    this.startY = 0;
    this.currentY = 0;
    this.dragThreshold = 100;
    this.dragStartSlop = 8; // minimal movement before starting drag
    this.dragStarted = false;
    this.startedOnHandle = false;
    this.scrollContainer = null; // nearest inner scrollable (e.g., mobile-dropdown-menu)
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    this.toggleButton = document.getElementById('mobile-menu-toggle');
    if (!this.toggleButton) {
      console.warn('Mobile menu toggle not found');
      return;
    }
    
    // Check if mobile menu already exists
    if (document.getElementById('mobile-menu-container')) {
      this.bindExistingMenu();
      return;
    }
    
    this.createMenu();
    this.bindEvents();
  }
  
  bindExistingMenu() {
    this.container = document.getElementById('mobile-menu-container');
    this.sheetPanel = this.container.querySelector('.sheet-panel');
    this.projectsToggle = document.getElementById('mobile-projects-toggle');
    this.projectsMenu = document.getElementById('mobile-projects-menu');
    this.bindEvents();
  }
    
  createMenu() {
    // Create mobile menu container
    this.container = document.createElement('div');
    this.container.className = 'mobile-menu-container';
    this.container.id = 'mobile-menu-container';
    this.container.setAttribute('role', 'dialog');
    this.container.setAttribute('aria-label', 'Mobile navigation menu');
    this.container.setAttribute('aria-hidden', 'true');
    
    // Get current page context
    const isHome = isHomePage();
    const isProject = isProjectPage();
    const navData = getNavigationData();
    
    // Build mobile menu content with tabs
    let mobileMenuHTML = `
      <div class="sheet-panel" aria-modal="true">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="mobile-menu-content">
          <div class="mobile-tabs" role="tablist" aria-label="Mobile menu tabs">
            <button class="mobile-tab active" role="tab" aria-selected="true" aria-controls="tab-links" id="tab-btn-links">Links</button>
            <button class="mobile-tab" role="tab" aria-selected="false" aria-controls="tab-projects" id="tab-btn-projects">Projects</button>
          </div>

          <div class="mobile-tabpanel active" id="tab-links" role="tabpanel" aria-labelledby="tab-btn-links">
            <div class="mobile-nav-links">
              <a href="/index.html" class="mobile-nav-link ${isHome ? 'active' : ''}">Home</a>
              <a href="/about_me.html" class="mobile-nav-link ${window.location.pathname.endsWith('/about_me.html') ? 'active' : ''}">About</a>
              <a href="mailto:portnoytim@gmail.com" class="contact-link mobile-contact-button">
                <button class="secondary-button">
                  <span class="material-symbols-outlined">mail</span>
                  <span class="button-text">Let's talk</span>
                </button>
              </a>
            </div>
          </div>

          <div class="mobile-tabpanel" id="tab-projects" role="tabpanel" aria-labelledby="tab-btn-projects">
            ${navData ? `
              <div class="mobile-projects-list" id="mobile-projects-list" role="list">
                ${getMenuProjects(navData).map(p => {
                  const isExternal = !!p.external;
                  const isActive = !isExternal && isProject && p.name === navData.current.name;
                  const href = isExternal ? p.path : `/${p.path}`;
                  const extra = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
                  const badge = isExternal ? '<span class="badge external">External</span>' : (isActive ? '<span class="badge current">Current</span>' : '');
                  return `
                    <a href="${href}" class="mobile-projects-item ${isActive ? 'active' : ''}" role="listitem" data-project-name="${p.name.toLowerCase()}"${extra}>
                      <span class="project-title">${p.name}</span>
                      ${badge}
                    </a>
                  `;
                }).join('')}
              </div>
            ` : `<div class="mobile-projects-empty">No projects available</div>`}
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = mobileMenuHTML;
    document.body.appendChild(this.container);
    
    // Cache references to created elements
    this.sheetPanel = this.container.querySelector('.sheet-panel');
    // Tabs
    this.linksTabBtn = this.container.querySelector('#tab-btn-links');
    this.projectsTabBtn = this.container.querySelector('#tab-btn-projects');
    this.linksPanel = this.container.querySelector('#tab-links');
    this.projectsPanel = this.container.querySelector('#tab-projects');
    // Projects search/list
    this.searchInput = this.container.querySelector('#mobile-projects-search-input');
    this.projectsList = this.container.querySelector('#mobile-projects-list');
    // Backwards-compat fields not used in tabbed UI
    this.projectsToggle = null;
    this.projectsMenu = null;
  }
    
  bindEvents() {
    // Clean up existing listeners
    this.removeAllEventListeners();
    
    // Toggle mobile menu
    const handleToggle = (e) => {
      e.preventDefault();
      this.toggleMenu();
    };
    
    this.addEventListener(this.toggleButton, 'click', handleToggle);
    
    // Handle keyboard navigation
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        this.toggleButton.focus();
      }
    };
    
    this.addEventListener(document, 'keydown', handleKeydown);
    
    // Tabs switching
    const switchToTab = (tab) => {
      const isLinks = tab === 'links';
      const linksBtn = this.linksTabBtn;
      const projectsBtn = this.projectsTabBtn;
      const linksPanel = this.linksPanel;
      const projectsPanel = this.projectsPanel;
      if (!linksBtn || !projectsBtn || !linksPanel || !projectsPanel) return;
      linksBtn.classList.toggle('active', isLinks);
      projectsBtn.classList.toggle('active', !isLinks);
      linksBtn.setAttribute('aria-selected', isLinks ? 'true' : 'false');
      projectsBtn.setAttribute('aria-selected', !isLinks ? 'true' : 'false');
      linksPanel.classList.toggle('active', isLinks);
      projectsPanel.classList.toggle('active', !isLinks);
    };

    if (this.linksTabBtn) {
      this.addEventListener(this.linksTabBtn, 'click', () => switchToTab('links'));
      this.addEventListener(this.linksTabBtn, 'keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); this.projectsTabBtn && this.projectsTabBtn.focus(); }
      });
    }
    if (this.projectsTabBtn) {
      this.addEventListener(this.projectsTabBtn, 'click', () => switchToTab('projects'));
      this.addEventListener(this.projectsTabBtn, 'keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); this.linksTabBtn && this.linksTabBtn.focus(); }
      });
    }

    // Projects search filter
    const handleSearch = (e) => {
      if (!this.projectsList) return;
      const q = (e.target.value || '').trim().toLowerCase();
      const items = Array.from(this.projectsList.querySelectorAll('.mobile-projects-item'));
      items.forEach(el => {
        const name = el.getAttribute('data-project-name') || '';
        el.style.display = name.includes(q) ? '' : 'none';
      });
    };
    if (this.searchInput) {
      this.addEventListener(this.searchInput, 'input', handleSearch);
    }
    
    // Close when clicking outside the sheet (on backdrop)
    const handleBackdropClick = (e) => {
      if (!this.isOpen) return;
      if (!this.sheetPanel) return;
      // If the click/touch is NOT inside the sheet panel, close
      if (!this.sheetPanel.contains(e.target)) {
        this.close();
      }
    };
    // Mouse/tap clicks on backdrop
    this.addEventListener(this.container, 'click', handleBackdropClick);
    // Touch on backdrop
    this.addEventListener(this.container, 'touchstart', handleBackdropClick, { passive: true });
    
    // Fallback: if click happens entirely outside the container (rare), also close
    const handleOutsideDocumentClick = (e) => {
      if (this.isOpen && !this.container.contains(e.target) && !this.toggleButton.contains(e.target)) {
        this.close();
      }
    };
    this.addEventListener(document, 'click', handleOutsideDocumentClick);
    
    // Close on window resize to desktop
    const handleResize = () => {
      if (window.innerWidth > 1080 && this.isOpen) {
        this.close();
      }
    };
    
    this.addEventListener(window, 'resize', handleResize);
    
    // Add touch drag functionality
    this.bindDragEvents();
  }
  
  addEventListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    this.eventListeners.push({ element, event, handler, options });
  }
  
  removeAllEventListeners() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
  }
  
  bindDragEvents() {
    if (!this.sheetPanel) return;
    
    const handleTouchStart = (e) => {
      if (!this.isOpen) return;
      
      this.isDragging = false; // we will activate after slop and rules
      this.dragStarted = false;
      this.startY = e.touches[0].clientY;
      this.currentY = this.startY;
      this.startedOnHandle = !!(e.target && e.target.closest && e.target.closest('.sheet-handle'));
      this.scrollContainer = e.target && e.target.closest ? e.target.closest('.mobile-dropdown-menu') : null;
      
      // Disable transitions only once we actually start dragging
      this.sheetPanel.style.transition = '';
    };
    
    const handleTouchMove = (e) => {
      if (!this.isOpen) return;
      
      this.currentY = e.touches[0].clientY;
      const deltaY = this.currentY - this.startY;
      
      // Determine whether we should begin dragging the sheet
      if (!this.dragStarted) {
        // If gesture started on the handle, allow drag when moving downward beyond slop
        if (this.startedOnHandle) {
          if (deltaY > this.dragStartSlop) {
            this.dragStarted = true;
            this.isDragging = true;
            this.sheetPanel.style.transition = 'none';
          } else {
            return; // ignore tiny movements
          }
        } else if (this.scrollContainer) {
          const atTop = this.scrollContainer.scrollTop <= 0;
          // If moving up, let the inner scroll handle it
          if (deltaY < 0) return;
          // If inner scroll is not at the top, do not start sheet drag; let it scroll
          if (!atTop) return;
          // Inner scroll at top and user swipes down beyond slop -> start dragging sheet
          if (deltaY > this.dragStartSlop) {
            this.dragStarted = true;
            this.isDragging = true;
            this.sheetPanel.style.transition = 'none';
          } else {
            return;
          }
        } else {
          // Started on general panel area, allow downward drag after slop
          if (deltaY > this.dragStartSlop) {
            this.dragStarted = true;
            this.isDragging = true;
            this.sheetPanel.style.transition = 'none';
          } else if (deltaY < 0) {
            // Upward movement, ignore
            return;
          } else {
            return;
          }
        }
      }
      
      if (!this.isDragging) return;
      
      // Active dragging - prevent native scroll and apply transform
      if (deltaY > 0) {
        e.preventDefault();
        const resistance = Math.min(deltaY / 3, 200);
        this.sheetPanel.style.transform = `translateY(${resistance}px)`;
        const opacity = Math.max(1 - (deltaY / 300), 0.3);
        this.sheetPanel.style.opacity = opacity;
      }
    };
    
    const handleTouchEnd = (e) => {
      if (!this.isOpen) return;
      
      const deltaY = this.currentY - this.startY;
      const wasDragging = this.isDragging;
      this.isDragging = false;
      this.dragStarted = false;
      this.startedOnHandle = false;
      this.scrollContainer = null;
      
      // Re-enable transitions
      this.sheetPanel.style.transition = '';
      
      if (!wasDragging) return;
      
      // Close if dragged down enough
      if (deltaY > this.dragThreshold) {
        this.close();
      } else {
        // Snap back to original position
        this.sheetPanel.style.transform = '';
        this.sheetPanel.style.opacity = '';
      }
    };
    
    // Bind touch events to the sheet panel
    this.addEventListener(this.sheetPanel, 'touchstart', handleTouchStart, { passive: false });
    this.addEventListener(this.sheetPanel, 'touchmove', handleTouchMove, { passive: false });
    this.addEventListener(this.sheetPanel, 'touchend', handleTouchEnd);
  }
  

    
  toggleProjectsDropdown() {
    // Deprecated: dropdown replaced by tabs
  }
  
  // Helper: programmatically switch tabs
  switchTab(tab) {
    const isLinks = tab === 'links';
    const linksBtn = this.linksTabBtn;
    const projectsBtn = this.projectsTabBtn;
    const linksPanel = this.linksPanel;
    const projectsPanel = this.projectsPanel;
    if (!linksBtn || !projectsBtn || !linksPanel || !projectsPanel) return;
    linksBtn.classList.toggle('active', isLinks);
    projectsBtn.classList.toggle('active', !isLinks);
    linksBtn.setAttribute('aria-selected', isLinks ? 'true' : 'false');
    projectsBtn.setAttribute('aria-selected', !isLinks ? 'true' : 'false');
    linksPanel.classList.toggle('active', isLinks);
    projectsPanel.classList.toggle('active', !isLinks);
  }
    
  
  open() {
    if (this.isOpen) return;
    
    this.isOpen = true;
    this.container.classList.add('active');
    this.toggleButton.classList.add('active');
    
    // Prevent body scroll
    document.body.classList.add('mobile-menu-open');
    
    // Default to Projects tab on project pages
    try {
      if (isProjectPage()) {
        this.switchTab('projects');
        // Focus search for quick filtering
        if (this.searchInput) {
          setTimeout(() => this.searchInput && this.searchInput.focus(), 50);
        }
      }
    } catch (_) {}
    
    // Close when clicking a link inside the menu
    const closeOnLinkClick = (e) => {
      if (e.target.tagName === 'A') {
        this.close();
      }
    };
    this.addEventListener(this.container, 'click', closeOnLinkClick);
  }
  
  close() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.container.classList.remove('active');
    this.toggleButton.classList.remove('active');
    
    // Reset any drag transforms
    if (this.sheetPanel) {
      this.sheetPanel.style.transform = '';
      this.sheetPanel.style.opacity = '';
      this.sheetPanel.style.transition = '';
    }
    
    // Restore body scroll
    document.body.classList.remove('mobile-menu-open');
    
    // Close projects dropdown if open
    if (this.projectsMenu && this.projectsMenu.classList.contains('show')) {
      this.toggleProjectsDropdown();
    }
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  destroy() {
    this.removeAllEventListeners();
    
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    
    // Restore body state
    document.body.classList.remove('mobile-menu-open');
  }
}

// Global mobile menu instance
let mobileMenuInstance = null;

// Mobile Menu Functionality
function initializeMobileMenu() {
  // Clean up existing instance
  if (mobileMenuInstance) {
    mobileMenuInstance.destroy();
  }
  
  // Create new instance
  mobileMenuInstance = new MobileMenu();
}

// Navigation Manager Class
class NavigationManager {
  constructor() {
    this.isInitialized = false;
    this.features = new Map();
  }
  
  initialize() {
    if (this.isInitialized) {
      this.cleanup();
    }
    
    // Create and inject navigation
    const navigationHTML = createUnifiedNavigation();
    if (!navigationHTML) return;
    
    document.body.insertAdjacentHTML('afterbegin', navigationHTML);
    // Ensure page starts at top on fresh navigations (not back/forward) and without hash
    try {
      const navEntries = performance.getEntriesByType && performance.getEntriesByType('navigation');
      const navEntry = navEntries && navEntries.length ? navEntries[0] : null;
      const isBackForward = navEntry && navEntry.type === 'back_forward';
      const hasHash = !!window.location.hash;
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      if (!isBackForward && !hasHash) {
        // Defer to next frame to avoid layout shifts
        requestAnimationFrame(() => window.scrollTo(0, 0));
      }
    } catch (e) {
      // no-op
    }
    
    // Initialize features
    this.initializeFeatures();
    this.isInitialized = true;
  }
  
  initializeFeatures() {
    const features = [
      { name: 'dropdown', init: initializeDropdown },
      { name: 'scrollBehavior', init: initializeScrollBehavior },
      { name: 'logoAnimation', init: () => {
        const logo = document.querySelector('.logo-image');
        const logoLink = document.querySelector('.logo-link');
        initLogoAnimation(logo, logoLink);
      }},
      { name: 'mobileMenu', init: initializeMobileMenu }
    ];
    
    features.forEach(({ name, init }) => {
      try {
        init();
        this.features.set(name, true);
      } catch (error) {
        console.warn(`Failed to initialize ${name}:`, error);
      }
    });
  }
  
  cleanup() {
    // Clean up mobile menu
    if (mobileMenuInstance) {
      mobileMenuInstance.destroy();
      mobileMenuInstance = null;
    }
    
    // Remove existing navigation
    const existingNav = document.querySelector('.unified-navigation');
    if (existingNav) {
      existingNav.remove();
    }
    
    this.features.clear();
    this.isInitialized = false;
  }
}

// Global navigation manager
const navigationManager = new NavigationManager();

// Main Initialization
function initializeNavigation() {
  navigationManager.initialize();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
  initializeNavigation();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (navigationManager) {
    navigationManager.cleanup();
  }
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden && mobileMenuInstance && mobileMenuInstance.isOpen) {
    mobileMenuInstance.close();
  }
});
