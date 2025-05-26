// Validation du formulaire de contact
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Fonction de validation pour chaque champ
function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.nextElementSibling.nextElementSibling;
    
    // Réinitialiser l'état d'erreur
    field.classList.remove('error');
    errorElement.textContent = '';
    
    // Validation spécifique selon le type de champ
    switch(field.type) {
        case 'text':
            if (field.id === 'nom' || field.id === 'prenom') {
                if (!/^[A-Za-zÀ-ÿ\- ]{2,30}$/.test(value)) {
                    field.classList.add('error');
                    errorElement.textContent = 'Veuillez entrer un nom/prénom valide (2-30 caractères, lettres uniquement)';
                    return false;
                }
            }
            break;
            
        case 'date':
            const date = new Date(value);
            const minDate = new Date('1900-01-01');
            const maxDate = new Date('2024-12-31');
            
            if (date < minDate || date > maxDate) {
                field.classList.add('error');
                errorElement.textContent = 'Veuillez entrer une date de naissance valide';
                return false;
            }
            break;
            
        case 'email':
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(value)) {
                field.classList.add('error');
                errorElement.textContent = 'Veuillez entrer une adresse email valide';
                return false;
            }
            break;
            
        case 'tel':
            // Suppression des espaces et des tirets pour la validation
            const cleanPhone = value.replace(/[\s-]/g, '');
            // Validation des formats : 0601020304, 0701020304, +33601020304, +33701020304
            if (!/^(?:(?:\+|00)33|0)[67]\d{8}$/.test(cleanPhone)) {
                field.classList.add('error');
                errorElement.textContent = 'Veuillez entrer un numéro de téléphone valide (format : 06 01 02 03 04, 07 01 02 03 04, +33 6 01 02 03 04, +33 7 01 02 03 04)';
                return false;
            }
            break;
            
        case 'textarea':
            if (value.length < 10 || value.length > 500) {
                field.classList.add('error');
                errorElement.textContent = 'Le message doit contenir entre 10 et 500 caractères';
                return false;
            }
            break;
    }
    
    return true;
}

// Validation en temps réel
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        validateField(input);
    });
    
    input.addEventListener('blur', () => {
        validateField(input);
    });
});

// Validation à la soumission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simulation d'envoi du formulaire
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
        
        setTimeout(() => {
            alert('Votre message a été envoyé avec succès !');
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer';
        }, 1500);
    }
}); 