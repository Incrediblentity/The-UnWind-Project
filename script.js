// Wait for the document to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', function() {
            
    // --- Page Navigation Logic ---
    const allPages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-button');
    const articleLinks = document.querySelectorAll('.article-link');
    const backToHomeButtons = document.querySelectorAll('.back-to-home');

    // Function to hide all pages and show just one
    function showPage(pageId) {
        // 1. Hide all pages
        allPages.forEach(page => {
            page.classList.add('hidden');
        });
        
        // 2. Show the one page we want
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
        }

        // 3. Update nav button styles
        navButtons.forEach(btn => {
            // Check if the button's ID matches the pageId
            if (btn.id === `nav-${pageId.split('-')[1]}`) {
                btn.classList.add('bg-emerald-600', 'text-white');
                btn.classList.remove('bg-emerald-100', 'text-emerald-800');
            } else {
                btn.classList.add('bg-emerald-100', 'text-emerald-800');
                btn.classList.remove('bg-emerald-600', 'text-white');
            }
        });
    }

    // --- Attach Nav Button Listeners ---
    document.getElementById('nav-home').addEventListener('click', () => showPage('page-home'));
    document.getElementById('nav-resources').addEventListener('click', () => showPage('page-resources'));
    document.getElementById('nav-breathe').addEventListener('click', () => showPage('page-breathe'));

    // --- Attach Article Link Listeners ---
    articleLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.getAttribute('data-target');
            showPage(targetPage);
        });
    });

    // --- Attach "Back to Home" Button Listeners ---
    backToHomeButtons.forEach(button => {
        button.addEventListener('click', () => showPage('page-home'));
    });

    // --- IMPROVEMENT #1: Resource Filter Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceItems = document.querySelectorAll('.resource-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update button styles
            filterButtons.forEach(btn => {
                btn.classList.add('bg-emerald-100', 'text-emerald-800');
                btn.classList.remove('bg-emerald-600', 'text-white');
            });
            button.classList.add('bg-emerald-600', 'text-white');
            button.classList.remove('bg-emerald-100', 'text-emerald-800');

            // Filter the resource list
            resourceItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- IMPROVEMENT #2: Breathing Tool Logic ---
    const breatheText = document.getElementById('breathe-text');

    // Check if the breatheText element exists before proceeding
    if (breatheText) {
        function cycleBreatheText() {
            // Corresponds to the 8-second animation
            breatheText.textContent = 'Breathe in...';
            
            setTimeout(() => {
                // 4s in (animation peak)
                breatheText.textContent = '...and hold...';
            }, 3500); // Hold for 1 second

            setTimeout(() => {
                breatheText.textContent = 'Breathe out...';
            }, 5000); // Breathe out for the remaining 3 seconds
        }

        // Start the cycle immediately
        cycleBreatheText(); 
        // Repeat the cycle every 8 seconds to match the CSS animation
        setInterval(cycleBreatheText, 8000); 
    }

    // --- Show the home page on initial load ---
    showPage('page-home');

});