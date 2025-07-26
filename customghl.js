<script>
// ===== GHL CUSTOMIZER - EXTERNAL HOSTING VERSION =====
// Host this file on GitHub Pages and reference via <script src="">

(function() {
    'use strict';
    
    console.log('🚀 GHL Customizer loading...');
    
    // =============================================================================
    // ACCOUNT DETECTION
    // =============================================================================
    
    function isExcludedAccount() {
        const excluded = window.location.href.includes('IfiXQg6qLoypg2ZLEswf');
        if (excluded) {
            console.log('🚫 EXCLUDED ACCOUNT: IfiXQg6qLoypg2ZLEswf - No customizations');
        }
        return excluded;
    }
    
    function isAgencyLevel() {
        const isAgency = !window.location.pathname.includes('/v2/location/');
        if (isAgency) {
            console.log('🏢 AGENCY LEVEL - No customizations');
        }
        return isAgency;
    }
    
    // Exit if excluded
    if (isExcludedAccount()) {
        document.body.setAttribute('data-excluded', 'true');
        return;
    }
    
    if (isAgencyLevel()) {
        document.body.setAttribute('data-agency-level', 'true');
        return;
    }
    
    // Mark as customizable
    document.body.setAttribute('data-excluded', 'false');
    document.body.setAttribute('data-agency-level', 'false');
    console.log('✅ APPLYING CUSTOMIZATIONS');
    
    // =============================================================================
    // IMMEDIATE REDIRECT
    // =============================================================================
    
    function forceImmediateRedirect() {
        const currentPath = window.location.pathname;
        const locationMatch = currentPath.match(/\/v2\/location\/([^\/]+)/);
        
        if (!locationMatch) return false;
        
        const locationId = locationMatch[1];
        const targetUrl = `/v2/location/${locationId}/marketing/social-planner/planner`;
        
        // Check if we're already on allowed pages
        if (currentPath.includes('social-planner') || currentPath.includes('brand-boards') || 
            currentPath.includes('/settings/profile') || currentPath.includes('/settings/saas-billing') ||
            currentPath.includes('/settings/business-info')) {
            return false;
        }
        
        // Force redirect for ANY other page
        console.log('🔄 REDIRECT:', currentPath, '→', targetUrl);
        window.location.replace(targetUrl);
        return true;
    }
    
    // Run redirect check immediately
    if (forceImmediateRedirect()) {
        return;
    }
    
    // =============================================================================
    // CONFIGURATION
    // =============================================================================
    
    const CONFIG = {
        ITEMS_TO_HIDE: [
            // Settings items
            'sb_my-staff', 'sb_location-email-services', 'sb_phone-number', 'sb_whatsapp',
            'sb_manage-scoring', 'sb_integrations', 'sb_undefined', 'sb_conversations_providers',
            'sb_labs', 'sb_audit-logs-location', 'sb_conversation-ai', 'sb_knowledge-base',
            'sb_voice-ai-agents', 'sb_sites',
            // Main sidebar items
            'sb_dashboard', 'sb_conversations', 'sb_calendars', 'sb_memberships',
            'sb_media-storage', 'sb_reporting', 'sb_docupro', 'sb_templates',
            'sb_launchpad', 'sb_contacts', 'sb_payments', 'sb_app-marketplace',
            'sb_reputation', '670ce982292541018a34fb9a'
        ],
        ITEMS_TO_KEEP: ['sb_email-marketing', 'sb_settings', 'sb_profile', 'sb_business_info', 'sb_saas-billing', 'sb_billing'],
        UNWANTED_TEXT_ITEMS: [
            'Launchpad', 'Contacts', 'Payments', 'Reputation', 'App Marketplace',
            'Summer of AI', 'AI Agents', 'Conversation AI', 'Knowledge Base', 'Voice AI Agents',
            'Sites', 'Dashboard', 'Conversations', 'Calendars', 'Memberships',
            'Media Storage', 'Reporting', 'DocuPro', 'Templates', 'All The Apps',
            'Content Wizard'
        ]
    };
    
    // =============================================================================
    // CORE FUNCTIONS - JQUERY AND VANILLA JS COMPATIBLE
    // =============================================================================
    
    function hideMenuItems() {
        let hiddenCount = 0;
        
        // Hide by ID
        CONFIG.ITEMS_TO_HIDE.forEach(id => {
            const element = document.getElementById(id);
            if (element && element.style.display !== 'none') {
                element.style.setProperty('display', 'none', 'important');
                element.style.setProperty('visibility', 'hidden', 'important');
                element.style.setProperty('opacity', '0', 'important');
                element.style.setProperty('height', '0', 'important');
                element.hidden = true;
                hiddenCount++;
                console.log(`🗑️ Hidden by ID: ${id}`);
            }
        });
        
        // Hide divider lines
        const dividers = document.querySelectorAll('#sidebar-v2 .divider, .divider, div.divider');
        dividers.forEach(divider => {
            divider.style.setProperty('display', 'none', 'important');
            divider.style.setProperty('visibility', 'hidden', 'important');
            divider.style.setProperty('height', '0', 'important');
            divider.style.setProperty('opacity', '0', 'important');
            hiddenCount++;
        });
        
        // Hide by text content
        CONFIG.UNWANTED_TEXT_ITEMS.forEach(itemName => {
            const elements = document.querySelectorAll('#sidebar-v2 a');
            elements.forEach(element => {
                const textContent = element.textContent.trim();
                if (textContent === itemName || textContent.includes(itemName)) {
                    element.style.setProperty('display', 'none', 'important');
                    element.style.setProperty('visibility', 'hidden', 'important');
                    element.style.setProperty('opacity', '0', 'important');
                    element.style.setProperty('height', '0', 'important');
                    element.style.setProperty('max-height', '0', 'important');
                    element.style.setProperty('overflow', 'hidden', 'important');
                    element.hidden = true;
                    hiddenCount++;
                    console.log(`🗑️ Hidden by text: ${itemName}`);
                }
            });
        });
        
        // Ensure kept items stay visible
        CONFIG.ITEMS_TO_KEEP.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.removeProperty('display');
                element.style.removeProperty('visibility');
                element.style.removeProperty('opacity');
                element.style.removeProperty('height');
                element.hidden = false;
            }
        });
        
        if (hiddenCount > 0) {
            console.log(`🎯 Hidden ${hiddenCount} menu items`);
        }
    }
    
    function addBrandBoardMenuItem() {
        if (!window.location.pathname.includes('/v2/location/') || 
            document.getElementById('custom-brand-board-menu')) {
            return;
        }
        
        const socialMediaButton = document.getElementById('sb_email-marketing');
        if (!socialMediaButton) return;
        
        const brandBoardItem = document.createElement('a');
        brandBoardItem.id = 'custom-brand-board-menu';
        
        const match = window.location.pathname.match(/\/v2\/location\/([^\/]+)/);
        if (match) {
            const locationId = match[1];
            brandBoardItem.href = `/v2/location/${locationId}/marketing/brand-boards`;
        }
        
        brandBoardItem.className = socialMediaButton.className;
        brandBoardItem.style.cssText = `
            color: #ffffff !important;
            background-color: transparent !important;
            font-family: 'Poppins', sans-serif !important;
            font-weight: 500 !important;
            padding: 12px 16px !important;
            margin-bottom: 2px !important;
            border-radius: 6px !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
            display: flex !important;
            align-items: center !important;
        `;
        
        const textSpan = document.createElement('span');
        textSpan.className = 'hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block';
        textSpan.textContent = 'Brand Board';
        textSpan.style.cssText = `
            color: #ffffff !important;
            font-family: 'Poppins', sans-serif !important;
            font-weight: 500 !important;
        `;
        
        brandBoardItem.appendChild(textSpan);
        
        // Hover effects
        brandBoardItem.addEventListener('mouseenter', function() {
            if (this.style.backgroundColor !== 'rgb(255, 215, 0)') {
                this.style.setProperty('background-color', 'rgba(255, 255, 255, 0.1)', 'important');
            }
        });
        
        brandBoardItem.addEventListener('mouseleave', function() {
            if (this.style.backgroundColor !== 'rgb(255, 215, 0)') {
                this.style.setProperty('background-color', 'transparent', 'important');
            }
        });
        
        socialMediaButton.parentNode.insertBefore(brandBoardItem, socialMediaButton);
        console.log('✓ Brand Board menu item added');
    }
    
    function updateMenuActiveStates() {
        const brandBoardItem = document.getElementById('custom-brand-board-menu');
        const socialMediaButton = document.getElementById('sb_email-marketing');
        
        if (!brandBoardItem || !socialMediaButton) return;
        
        const currentPath = window.location.pathname;
        const isOnBrandBoards = currentPath.includes('brand-boards');
        const isOnSocialPlanner = currentPath.includes('social-planner');
        
        if (isOnBrandBoards) {
            // Brand Board active
            brandBoardItem.style.setProperty('background-color', '#FFD700', 'important');
            brandBoardItem.style.setProperty('color', '#000000', 'important');
            const brandSpan = brandBoardItem.querySelector('span');
            if (brandSpan) brandSpan.style.setProperty('color', '#000000', 'important');
            
            // Social Media inactive
            socialMediaButton.style.setProperty('background-color', 'transparent', 'important');
            socialMediaButton.style.setProperty('color', '#ffffff', 'important');
            const socialSpans = socialMediaButton.querySelectorAll('span');
            socialSpans.forEach(span => span.style.setProperty('color', '#ffffff', 'important'));
            
        } else if (isOnSocialPlanner) {
            // Social Media active
            socialMediaButton.style.setProperty('background-color', '#FFD700', 'important');
            socialMediaButton.style.setProperty('color', '#000000', 'important');
            const socialSpans = socialMediaButton.querySelectorAll('span');
            socialSpans.forEach(span => span.style.setProperty('color', '#000000', 'important'));
            
            // Brand Board inactive
            brandBoardItem.style.setProperty('background-color', 'transparent', 'important');
            brandBoardItem.style.setProperty('color', '#ffffff', 'important');
            const brandSpan = brandBoardItem.querySelector('span');
            if (brandSpan) brandSpan.style.setProperty('color', '#ffffff', 'important');
            
        } else {
            // Both inactive
            brandBoardItem.style.setProperty('background-color', 'transparent', 'important');
            brandBoardItem.style.setProperty('color', '#ffffff', 'important');
            const brandSpan = brandBoardItem.querySelector('span');
            if (brandSpan) brandSpan.style.setProperty('color', '#ffffff', 'important');
            
            socialMediaButton.style.setProperty('background-color', 'transparent', 'important');
            socialMediaButton.style.setProperty('color', '#ffffff', 'important');
            const socialSpans = socialMediaButton.querySelectorAll('span');
            socialSpans.forEach(span => span.style.setProperty('color', '#ffffff', 'important'));
        }
    }
    
    function addLogoutButton() {
        if (document.getElementById('css-logout-button')) return;
        
        const settingsButton = document.getElementById('sb_settings');
        if (!settingsButton) return;
        
        const logoutBtn = document.createElement('a');
        logoutBtn.id = 'css-logout-button';
        logoutBtn.href = '/logout';
        logoutBtn.textContent = 'Logout';
        logoutBtn.style.cssText = `
            color: #ffffff !important;
            font-family: 'Poppins', sans-serif !important;
            font-weight: 500 !important;
            padding: 12px 16px !important;
            margin-bottom: 2px !important;
            border-radius: 6px !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
            display: block !important;
        `;
        
        logoutBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        logoutBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        settingsButton.parentNode.insertBefore(logoutBtn, settingsButton.nextSibling);
        console.log('✓ Logout button added');
    }
    
    function fixGoBackButton() {
        const goBackButton = document.getElementById('backButtonv2');
        if (goBackButton && !goBackButton.hasAttribute('data-redirect-fixed')) {
            goBackButton.setAttribute('data-redirect-fixed', 'true');
            
            goBackButton.addEventListener('click', (e) => {
                if (!window.location.pathname.includes('/v2/location/')) {
                    return;
                }
                
                e.preventDefault();
                e.stopPropagation();
                
                const match = window.location.pathname.match(/\/v2\/location\/([^\/]+)/);
                if (match) {
                    const locationId = match[1];
                    const targetUrl = `/v2/location/${locationId}/marketing/social-planner/planner`;
                    console.log('🔄 Go Back redirect:', targetUrl);
                    window.location.href = targetUrl;
                }
            });
            
            console.log('✓ Go Back button fixed');
        }
    }
    
    // =============================================================================
    // INITIALIZATION
    // =============================================================================
    
    function runInitialization() {
        console.log('🔧 Running initialization...');
        hideMenuItems();
        addBrandBoardMenuItem();
        updateMenuActiveStates();
        addLogoutButton();
        fixGoBackButton();
        console.log('✅ Initialization complete');
    }
    
    // =============================================================================
    // MONITORING & OBSERVERS
    // =============================================================================
    
    function setupObserver() {
        let observer = new MutationObserver(() => {
            setTimeout(runInitialization, 100);
        });
        
        const sidebar = document.querySelector('#sidebar-v2') || document.body;
        observer.observe(sidebar, { 
            childList: true, 
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', 'hidden']
        });
        
        console.log('👁️ Observer setup complete');
    }
    
    function setupUrlMonitoring() {
        let currentUrl = location.href;
        setInterval(() => {
            if (location.href !== currentUrl) {
                currentUrl = location.href;
                console.log('🔄 URL changed, re-initializing');
                setTimeout(() => {
                    runInitialization();
                    updateMenuActiveStates();
                }, 300);
            }
        }, 1000);
        
        console.log('🔍 URL monitoring active');
    }
    
    // =============================================================================
    // START THE CUSTOMIZER
    // =============================================================================
    
    function startCustomizer() {
        console.log('🚀 Starting GHL Customizer');
        
        // Run immediately
        runInitialization();
        
        // Run again after delays to catch late-loading items
        setTimeout(runInitialization, 1000);
        setTimeout(runInitialization, 3000);
        
        // Set up continuous monitoring
        setupObserver();
        setupUrlMonitoring();
        
        console.log('✅ GHL Customizer fully initialized');
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startCustomizer);
    } else {
        startCustomizer();
    }
    
    // Expose for debugging
    window.GHLCustomizer = {
        reinit: runInitialization,
        hideItems: hideMenuItems,
        updateStates: updateMenuActiveStates,
        config: CONFIG
    };
    
    console.log('📋 GHL Customizer loaded successfully');
    
})();
</script>
