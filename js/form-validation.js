document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('confirmationModal');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    // Regex patterns
    const patterns = {
        nom: /^[A-Za-zÀ-ÿ\- ]{2,30}$/,
        prenom: /^[A-Za-zÀ-ÿ\- ]{2,30}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
        telephone: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
        message: /^.{10,500}$/
    };

    // Messages d'erreur
    const errorMessages = {
        nom: 'Le nom doit contenir entre 2 et 30 caractères (lettres uniquement)',
        prenom: 'Le prénom doit contenir entre 2 et 30 caractères (lettres uniquement)',
        email: 'Veuillez entrer une adresse email valide',
        telephone: 'Veuillez entrer un numéro de téléphone valide (format français)',
        message: 'Le message doit contenir entre 10 et 500 caractères'
    };

    // Fonction de validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.id;
        const pattern = patterns[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`) || createErrorElement(field);

        if (!pattern.test(value)) {
            field.classList.add('invalid');
            errorElement.textContent = errorMessages[fieldName];
            errorElement.style.display = 'block';
            return false;
        } else {
            field.classList.remove('invalid');
            errorElement.style.display = 'none';
            return true;
        }
    }

    // Création d'un élément d'erreur
    function createErrorElement(field) {
        const errorElement = document.createElement('div');
        errorElement.id = `${field.id}Error`;
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
        return errorElement;
    }

    // Validation en temps réel
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            validateField(field);
        });

        field.addEventListener('blur', () => {
            validateField(field);
        });
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            showModal();
        }
    });

    // Gestion de la modal
    function showModal() {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        confirmButton.focus();
    }

    function hideModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    // Gestion des boutons de la modal
    confirmButton.addEventListener('click', () => {
        hideModal();
        // Ici, vous pouvez ajouter le code pour envoyer le formulaire
        form.submit();
    });

    cancelButton.addEventListener('click', () => {
        hideModal();
    });

    // Fermeture de la modal avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });

    // Gestion du focus dans la modal
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll('button');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}); 