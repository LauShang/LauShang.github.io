// Tooltip positioning on scroll
document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.querySelector('.tooltip');
    if (!tooltip) return;
    
    let activeHex = null;
    
    // Update tooltip position on scroll
    window.addEventListener('scroll', function() {
        if (activeHex) {
            const hexRect = activeHex.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            const top = hexRect.top - tooltipRect.height - 20;
            const left = hexRect.left + (hexRect.width / 2) - (tooltipRect.width / 2);
            
            // Check if the tooltip would go off the top of the screen
            if (top < 10) {
                tooltip.style.top = (hexRect.bottom + 20) + 'px';
                tooltip.classList.add('top');
            } else {
                tooltip.style.top = top + 'px';
                tooltip.classList.remove('top');
            }
            
            tooltip.style.left = left + 'px';
        }
    });
    
    // Track active hex
    document.querySelectorAll('.skill-hex').forEach(hex => {
        hex.addEventListener('mouseenter', function() {
            activeHex = this;
        });
        
        hex.addEventListener('mouseleave', function() {
            activeHex = null;
        });
    });
});
