document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.getElementById('cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            console.log('CTA clicked');
            // Add interaction logic here
            alert('¡Gracias por tu interés en Dozo Tech!');
        });
    }

    // Example: Add a simple scroll effect to navbar on scroll could go here
});
