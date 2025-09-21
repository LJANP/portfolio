// Instagram Concept - Full-Screen Experience

document.addEventListener('DOMContentLoaded', function () {
    const instagramCard = document.querySelector('.instagram-card');
    let isExpanded = false;
    let overlay = null;
    let expandedCard = null;

    // Instagram detailed content
    const instagramContent = `
        <div class="instagram-content-wrapper">
            <div class="instagram-content">
            <div class="instagram-header">
                <div class="concept-icon">
                    <i class="fab fa-instagram"></i>
                </div>
                <h2 class="instagram-title">Instagram User-to-User Advertising</h2>
                <p class="instagram-subtitle"></p>
            </div>
            
            <div class="instagram-sections">
                <div class="instagram-section">
                    <h4>Market Opportunity</h4>
                    <p>The influencer marketing industry represents $32 billion in annual transactions, but these deals happen entirely outside social platforms. Brands and creators currently rely on PayPal, Venmo, Stripe, or wire transfers with no fulfillment guarantees—leading to fraud, payment disputes, and broken agreements.</p>
                </div>
                
                <div class="instagram-section">
                    <h4>The Problem</h4>
                    <p>Current creator-brand advertising transactions are inefficient and risky:</p>
                    <ul class="problem-list">
                        <li>Advertisers have no guarantee creators will fulfill sponsored post agreements</li>
                        <li>Creators risk non-payment after delivering content</li>
                        <li>Both sides use external payment methods with no platform oversight</li>
                        <li>Meta generates no revenue from these direct relationships despite facilitating them</li>
                    </ul>
                </div>
                
                <div class="instagram-section">
                    <h4>Solution</h4>
                    <p>Enable users to advertise directly on each other's accounts through Instagram's native system:</p>
                    
                    <div class="solution-groups">
                        <div class="solution-group">
                            <h5>For Advertisers:</h5>
                            <ul>
                                <li>Browse creator rate cards (story: $100, post: $500, package deals)</li>
                                <li>Submit ad content with preferred posting schedule</li>
                                <li>Payment held in escrow until content goes live</li>
                            </ul>
                            
                            <div class="advertiser-gallery">
                                <div class="card-stack" id="advertiser-card-stack">
                                    <div class="stack-card" data-index="0">
                                        <img src="images/instagram-advertiser-1.png" alt="Advertising Packages - Browse creator rate cards" class="stack-image">
                                        <div class="card-label">Step 1: View Creator Profile</div>
                                    </div>
                                    <div class="stack-card" data-index="1">
                                        <img src="images/instagram-advertiser-2.png" alt="Creator Profile - View engagement metrics" class="stack-image">
                                        <div class="card-label">Step 2: Browse Packages</div>
                                    </div>
                                    <div class="stack-card" data-index="2">
                                        <img src="images/instagram-advertiser-3.png" alt="Create Your Ad - Upload content and caption" class="stack-image">
                                        <div class="card-label">Step 3: Create Your Ad</div>
                                    </div>
                                    <div class="stack-card" data-index="3">
                                        <img src="images/instagram-advertiser-4.png" alt="Submit for Review - Complete order with escrow payment" class="stack-image">
                                        <div class="card-label">Step 4: Submit for Review</div>
                                    </div>
                                </div>
                                <div class="stack-hint">Click to see next step</div>
                            </div>
                        </div>
                        
                        <div class="solution-group">
                            <h5>For Creators:</h5>
                            <ul>
                                <li>Set transparent pricing for different content types</li>
                                <li>Review and approve submitted ads before posting</li>
                                <li>Automatic payment release when content publishes</li>
                            </ul>
                            
                            <div class="creator-gallery">
                                <div class="card-stack" id="creator-card-stack">
                                    <div class="stack-card" data-index="0">
                                        <img src="images/instagram-creator-1.png" alt="Creator Dashboard - View pending ad requests and earnings" class="stack-image">
                                        <div class="card-label">Step 1: View Dashboard</div>
                                    </div>
                                    <div class="stack-card" data-index="1">
                                        <img src="images/instagram-creator-2.png" alt="Ad Request Details - Review advertiser content and requirements" class="stack-image">
                                        <div class="card-label">Step 2: Review Ad Request</div>
                                    </div>
                                    <div class="stack-card" data-index="2">
                                        <img src="images/instagram-creator-3.png" alt="Manage Requests - Handle multiple pending advertising requests" class="stack-image">
                                        <div class="card-label">Step 3: Manage Multiple Requests</div>
                                    </div>
                                    <div class="stack-card" data-index="3">
                                        <img src="images/instagram-creator-4.png" alt="Request Details - View payment info and approve sponsored content" class="stack-image">
                                        <div class="card-label">Step 4: Approve & Get Paid</div>
                                    </div>
                                </div>
                                <div class="stack-hint">Click to see next step</div>
                            </div>
                        </div>
                        
                        <div class="solution-group">
                            <h5>For Instagram:</h5>
                            <ul>
                                <li>Take 5% commission on all transactions</li>
                                <li>Build creator economy directly into platform</li>
                                <li>Increase user stickiness through financial relationships</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="instagram-section">
                    <h4>Strategic Advantage</h4>
                    <p><strong>Solves trust problem:</strong> Platform guarantee ensures both sides fulfill agreements</p>
                    <p><strong>Reduces friction:</strong> Native integration eliminates external payment coordination</p>
                    <p><strong>Captures value:</strong> Instagram profits from relationships it already enables</p>
                </div>
            </div>
        </div>
        </div>
    `;

    // Create overlay
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'instagram-overlay';
        document.body.appendChild(overlay);

        // Close on overlay click
        overlay.addEventListener('click', closeExpanded);
    }

    // Create close button
    function createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'instagram-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', closeExpanded);
        return closeBtn;
    }

    // Open expanded view
    function openExpanded() {
        if (isExpanded) return;
        isExpanded = true;

        // Hide original card content during expansion
        instagramCard.classList.add('expanding');

        // Create overlay
        createOverlay();

        // Get original card position
        const rect = instagramCard.getBoundingClientRect();

        // Create expanded card
        expandedCard = document.createElement('div');
        expandedCard.className = 'instagram-expanded';
        expandedCard.innerHTML = instagramContent;

        // Add close button
        const closeBtn = createCloseButton();
        expandedCard.appendChild(closeBtn);

        // Set initial position (same as original card)
        expandedCard.style.top = rect.top + 'px';
        expandedCard.style.left = rect.left + 'px';
        expandedCard.style.width = rect.width + 'px';
        expandedCard.style.height = rect.height + 'px';

        // Add to DOM
        document.body.appendChild(expandedCard);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Animate overlay
        requestAnimationFrame(() => {
            overlay.classList.add('active');

            // Animate card expansion after overlay starts
            setTimeout(() => {
                expandedCard.style.top = '10vh';
                expandedCard.style.left = '50%';
                expandedCard.style.transform = 'translateX(-50%)';
                expandedCard.style.width = '90vw';
                expandedCard.style.maxWidth = '1000px';
                expandedCard.style.height = '80vh';

                // Show UI elements after expansion animation completes
                setTimeout(() => {
                    // Enable scrollbars
                    expandedCard.classList.add('animation-complete');

                    // Show close button
                    const closeBtn = expandedCard.querySelector('.instagram-close');
                    if (closeBtn) {
                        closeBtn.classList.add('show');
                    }

                    // Reveal content with staggered animations
                    const content = expandedCard.querySelector('.instagram-content');
                    if (content) {
                        content.classList.add('reveal-content');
                    }

                    // Initialize card stack interaction
                    initializeCardStack();
                }, 600); // Wait for expansion animation to complete

            }, 100);
        });
    }

    // Close expanded view
    function closeExpanded() {
        if (!isExpanded) return;
        isExpanded = false;

        // Immediately hide detailed content for clean closing
        if (expandedCard) {
            const content = expandedCard.querySelector('.instagram-content');
            if (content) {
                content.classList.remove('reveal-content');
            }

            // Hide close button and scrollbars
            const closeBtn = expandedCard.querySelector('.instagram-close');
            if (closeBtn) {
                closeBtn.classList.remove('show');
            }
            expandedCard.classList.remove('animation-complete');
        }

        // Get original card position for return animation
        const rect = instagramCard.getBoundingClientRect();

        // Animate back to original position
        if (expandedCard) {
            expandedCard.style.top = rect.top + 'px';
            expandedCard.style.left = rect.left + 'px';
            expandedCard.style.transform = 'none';
            expandedCard.style.width = rect.width + 'px';
            expandedCard.style.height = rect.height + 'px';
        }

        // Fade out overlay
        if (overlay) {
            overlay.classList.remove('active');
        }

        // Clean up after animation and restore original card
        setTimeout(() => {
            if (expandedCard) {
                expandedCard.remove();
                expandedCard = null;
            }
            if (overlay) {
                overlay.remove();
                overlay = null;
            }
            document.body.style.overflow = '';

            // Remove expanding state and add closing state for smooth fade-in
            instagramCard.classList.remove('expanding');
            instagramCard.classList.add('closing');

            // Remove closing state after fade-in completes
            setTimeout(() => {
                instagramCard.classList.remove('closing');
            }, 700);
        }, 600);
    }

    // Add click listener to Instagram card
    if (instagramCard) {
        instagramCard.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openExpanded();
        });
    }

    // Initialize card stack functionality
    function initializeCardStack() {
        // Initialize advertiser card stack
        initializeStack('advertiser-card-stack');
        
        // Initialize creator card stack
        initializeStack('creator-card-stack');
    }

    // Generic function to initialize any card stack
    function initializeStack(stackId) {
        const cardStack = document.getElementById(stackId);
        if (!cardStack) return;

        let currentIndex = 0;
        const cards = cardStack.querySelectorAll('.stack-card');
        const totalCards = cards.length;

        cardStack.addEventListener('click', function () {
            // Get current top card
            const currentCard = cards[currentIndex];

            // Add peeling animation
            currentCard.classList.add('peeling');

            // Move to next card
            currentIndex = (currentIndex + 1) % totalCards;

            // After animation, reset the peeled card to bottom of stack
            setTimeout(() => {
                currentCard.classList.remove('peeling');

                // Reorder z-index for all cards
                cards.forEach((card, index) => {
                    const newIndex = (index - currentIndex + totalCards) % totalCards;
                    card.setAttribute('data-index', newIndex);
                });
            }, 600);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isExpanded) {
            closeExpanded();
        }
    });
});