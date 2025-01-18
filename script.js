document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm') || document.getElementById('partnerForm');
    console.log(form, "john")
    const statusElement = document.getElementById('status');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const subject = form.id === 'contactForm' ? 'Contact Us Message' : 'Partner With Us Inquiry'; // Conditional subject based on form

        const emailData = {
            to: 'tonykurisunkal1994@gmail.com',
            subject: subject,
            text: `This is the message from ${document.getElementById('name').value} and his email is ${document.getElementById('email').value} his message is "${document.getElementById('message').value}"`,
        };

        // Clear previous status
        statusElement.textContent = '';

        try {
            const response = await fetch('https://blocknetica-nestjs.vercel.app/mail/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            const result = await response.json();
            statusElement.textContent = result.message || 'Email sent successfully!';
        } catch (error) {
            statusElement.textContent = 'Error: ' + error.message;
        }
    });
});
