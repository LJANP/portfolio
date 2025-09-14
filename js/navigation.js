// Simple cross-fade navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item[data-page]');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');

            // Start fade out
            document.body.classList.add('fade-out');

            // Navigate after fade out completes
            setTimeout(() => {
                window.location.href = targetPage;
            }, 300);
        });
    });
});