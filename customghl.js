<script>
// ===== JQUERY-POWERED GHL CUSTOMIZER - PROFESSIONAL VERSION =====
// This version uses jQuery for bulletproof DOM handling like other providers

(function() {
    'use strict';
    
    // =============================================================================
    // LOAD JQUERY AND INITIALIZE
    // =============================================================================
    
    function loadjQuery(callback) {
        if (typeof jQuery !== 'undefined') {
            console.log('✅ jQuery already loaded');
            callback(jQuery);
            return;
        }
        
        console.log('📦 Loading jQuery...');
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = function() {
            console.log('✅ jQuery loaded successfully');
            callback(jQuery);
        };
        script.onerror = function() {
            console.error('❌ Failed to load jQuery');
        };
        document.head.appendChild(script);
    }
    
    // =============================================================================
    // MAIN CUSTOMIZER FUNCTION
    // =============================================================================
    
    function initializeCustomizer($) {
        console.log('🚀 GHL Customizer starting with jQuery');
        
        // =============================================================================
        // ACCOUNT DETECTION
        // =============================================================================
        
        function isExcludedAccount() {
            const excluded = window.location.href.includes('IfiXQg6qLoypg2ZLEswf');
            if (excluded) {
                console.log('🚫 EXCLUDED ACCOUNT: IfiXQg6qLoypg2ZLEswf');
                $('body').attr('data-excluded', 'true');
            }
            return excluded;
        }
        
        function isAgencyLevel() {
            const isAgency = !window.location.pathname.includes('/v2/location/');
            if (isAgency) {
                console.log('🏢 AGENCY LEVEL - No customizations');
                $('body').attr('data-agency-level', 'true');
            }
            return isAgency;
        }
        
        // Exit if excluded
        if (isExcludedAccount() || isAgencyLevel()) {
            return;
        }
        
        // Mark as customizable
        $('body').attr({
            'data-excluded': 'false',
            'data-agency-level': 'false'
        });
        console.log('✅ APPLYING CUSTOMIZATIONS');
        
        // =============================================================================
        // IMMEDIATE REDIRECT
        // =============================================================================
        
        function handleRedirect() {
            const currentPath = window.location.pathname;
            const locationMatch = currentPath.match(/\/v2\/location\/([^\/]+)/);
            
            if (!locationMatch) return false;
            
            const locationId = locationMatch[1];
            const targetUrl = `/v2/location/${locationId}/marketing/social-planner/planner`;
            
            // Check if we're already on allowed pages
            const allowedPages = ['social-planner', 'brand-boards', '/settings/profile', '/settings/saas-billing', '/settings/business-info'];
            if (allowedPages.some(page => currentPath.includes(page))) {
                return false;
            }
            
            console.log('🔄 REDIRECT:', currentPath, '→', targetUrl);
            window.location.replace(targetUrl);
            return true;
        }
        
        // Run redirect check
        if (handleRedirect()) {
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
        // CORE FUNCTIONS WITH JQUERY
        // =============================================================================
        
        function hideMenuItems() {
            let hiddenCount = 0;
            
            // Hide by ID using jQuery
            CONFIG.ITEMS_TO_HIDE.forEach(id => {
                const $element = $('#' + id);
                if ($element.length && $element.is(':visible')) {
                    $element.css({
                        'display': 'none !important',
                        'visibility': 'hidden !important',
                        'opacity': '0 !important',
                        'height': '0 !important'
                    }).prop('hidden', true);
                    hiddenCount++;
                    console.log(`🗑️ Hidden by ID: ${id}`);
                }
            });
            
            // Hide divider lines
            $('#sidebar-v2 .divider, .divider, div.divider').each(function() {
                $(this).css({
                    'display': 'none !important',
                    'visibility': 'hidden !important',
                    'height': '0 !important',
                    'opacity': '0 !important'
                });
                hiddenCount++;
            });
            
            // Hide by text content using jQuery
            CONFIG.UNWANTED_TEXT_ITEMS.forEach(itemName => {
                $('#sidebar-v2 a').each(function() {
                    const $this = $(this);
                    const textContent = $this.text().trim();
                    if (textContent === itemName || textContent.includes(itemName)) {
                        $this.css({
                            'display': 'none !important',
                            'visibility': 'hidden !important',
                            'opacity': '0 !important',
                            'height': '0 !important',
                            'max-height': '0 !important',
                            'overflow': 'hidden !important'
                        }).prop('hidden', true);
                        hiddenCount++;
                        console.log(`🗑️ Hidden by text: ${itemName}`);
                    }
                });
            });
            
            // Ensure kept items stay visible
            CONFIG.ITEMS_TO_KEEP.forEach(id => {
                const $element = $('#' + id);
                if ($element.length) {
                    $element.css({
                        'display': '',
                        'visibility': '',
                        'opacity': '',
                        'height': ''
                    }).prop('hidden', false);
                }
            });
            
            if (hiddenCount > 0) {
                console.log(`🎯 Hidden ${hiddenCount} menu items`);
            }
        }
        
        function addBrandBoardMenuItem() {
            if (!window.location.pathname.includes('/v2/location/') || $('#custom-brand-board-menu').length) {
                return;
            }
            
            const $socialMediaButton = $('#sb_email-marketing');
            if (!$socialMediaButton.length) return;
            
            const locationMatch = window.location.pathname.match(/\/v2\/location\/([^\/]+)/);
            if (!locationMatch) return;
            
            const locationId = locationMatch[1];
            const $brandBoardItem = $(`
                <a id="custom-brand-board-menu" href="/v2/location/${locationId}/marketing/brand-boards" 
                   class="${$socialMediaButton.attr('class')}"
                   style="color: #ffffff !important; background-color: transparent !important; 
                          font-family: 'Poppins', sans-serif !important; font-weight: 500 !important;
                          padding: 12px 16px !important; margin-bottom: 2px !important;
                          border-radius: 6px !important; transition: all 0.3s ease !important;
                          text-decoration: none !important; display: flex !important;
                          align-items: center !important;">
                    <span class="hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block"
                          style="color: #ffffff !important; font-family: 'Poppins', sans-serif !important; 
                                 font-weight: 500 !important;">Brand Board</span>
                </a>
            `);
            
            // Add hover effects
            $brandBoardItem.hover(
                function() {
                    if ($(this).css('background-color') !== 'rgb(255, 215, 0)') {
                        $(this).css('background-color', 'rgba(255, 255, 255, 0.1)');
                    }
                },
                function() {
                    if ($(this).css('background-color') !== 'rgb(255, 215, 0)') {
                        $(this).css('background-color', 'transparent');
                    }
                }
            );
            
            $socialMediaButton.before($brandBoardItem);
            console.log('✓ Brand Board menu item added');
        }
        
        function updateActiveStates() {
            const $brandBoard = $('#custom-brand-board-menu');
            const $socialMedia = $('#sb_email-marketing');
            
            if (!$brandBoard.length || !$socialMedia.length) return;
            
            const currentPath = window.location.pathname;
            const isOnBrandBoards = currentPath.includes('brand-boards');
            const isOnSocialPlanner = currentPath.includes('social-planner');
            
            // Reset both to inactive state
            [$brandBoard, $socialMedia].forEach($item => {
                $item.css({
                    'background-color': 'transparent !important',
                    'color': '#ffffff !important'
                });
                $item.find('span').css('color', '#ffffff !important');
            });
            
            if (isOnBrandBoards) {
                $brandBoard.css({
                    'background-color': '#FFD700 !important',
                    'color': '#000000 !important'
                });
                $brandBoard.find('span').css('color', '#000000 !important');
                console.log('✅ Brand Board activated');
                
            } else if (isOnSocialPlanner) {
                $socialMedia.css({
                    'background-color': '#FFD700 !important',
                    'color': '#000000 !important'
                });
                $socialMedia.find('span').css('color', '#000000 !important');
                console.log('✅ Social Media activated');
            }
        }
        
        function addLogoutButton() {
            if ($('#css-logout-button').length) return;
            
            const $settingsButton = $('#sb_settings');
            if (!$settingsButton.length) return;
            
            const $logoutBtn = $(`
                <a id="css-logout-button" href="/logout"
                   style="color: #ffffff !important; font-family: 'Poppins', sans-serif !important;
                          font-weight: 500 !important; padding: 12px 16px !important;
                          margin-bottom: 2px !important; border-radius: 6px !important;
                          transition: all 0.3s ease !important; text-decoration: none !important;
                          display: block !important;">Logout</a>
            `);
            
            $logoutBtn.hover(
                function() { $(this).css('background-color', 'rgba(255, 255, 255, 0.1)'); },
                function() { $(this).css('background-color', 'transparent'); }
            );
            
            $settingsButton.after($logoutBtn);
            console.log('✓ Logout button added');
        }
        
        function fixGoBackButton() {
            const $goBackButton = $('#backButtonv2');
            if ($goBackButton.length && !$goBackButton.attr('data-redirect-fixed')) {
                $goBackButton.attr('data-redirect-fixed', 'true');
                
                $goBackButton.on('click', function(e) {
                    if (!window.location.pathname.includes('/v2/location/')) return;
                    
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
        // INITIALIZATION WITH JQUERY
        // =============================================================================
        
        function runCustomizations() {
            console.log('🔧 Running jQuery customizations...');
            hideMenuItems();
            addBrandBoardMenuItem();
            updateActiveStates();
            addLogoutButton();
            fixGoBackButton();
            console.log('✅ jQuery customizations complete');
        }
        
        // =============================================================================
        // JQUERY DOCUMENT READY AND MONITORING
        // =============================================================================
        
        $(document).ready(function() {
            console.log('📄 DOM ready, running customizations');
            runCustomizations();
            
            // Run again after delays to catch dynamic content
            setTimeout(runCustomizations, 1000);
            setTimeout(runCustomizations, 3000);
            
            // Monitor for DOM changes using jQuery
            const observer = new MutationObserver(function() {
                setTimeout(runCustomizations, 100);
            });
            
            const targetNode = document.querySelector('#sidebar-v2') || document.body;
            observer.observe(targetNode, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class', 'hidden']
            });
            
            // Monitor URL changes
            let currentUrl = location.href;
            setInterval(function() {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    console.log('🔄 URL changed, re-running customizations');
                    setTimeout(function() {
                        runCustomizations();
                        updateActiveStates();
                    }, 300);
                }
            }, 1000);
            
            console.log('👁️ jQuery monitoring setup complete');
        });
        
        // Also run if DOM is already ready
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(runCustomizations, 100);
        }
        
        // Expose for debugging
        window.GHLCustomizer = {
            $: $,
            runCustomizations: runCustomizations,
            updateActiveStates: updateActiveStates,
            config: CONFIG
        };
        
        console.log('✅ jQuery GHL Customizer fully loaded');
    }
    
    // =============================================================================
    // START THE PROCESS
    // =============================================================================
    
    loadjQuery(initializeCustomizer);
    
})();
</script>
