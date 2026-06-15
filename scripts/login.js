// Usuarios simulados
const USERS = [
    {
        id: 1,
        email: "admin@softdev.com",
        password: "admin123",
        name: "Administrador",
        role: "admin"
    },
    {
        id: 2,
        email: "user@softdev.com",
        password: "user123",
        name: "Usuario Demo",
        role: "user"
    }
];

// Validación de credenciales
function validateCredentials(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const user = USERS.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword);

    if (user) {
        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                loginTime: new Date().toISOString()
            }
        };
    }

    return {
        success: false,
        message: "Correo o contraseña incorrectos"
    };
}

// Guardar sesión
function saveSession(user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("lastLogin", new Date().toISOString());
}

// Mostrar error
function showError(message) {
    const errorDiv = document.getElementById("errorMessage");
    const errorSpan = errorDiv.querySelector("span");
    errorSpan.textContent = message;
    errorDiv.style.display = "flex";
    
    setTimeout(() => {
        errorDiv.style.opacity = "0";
        setTimeout(() => {
            errorDiv.style.display = "none";
            errorDiv.style.opacity = "1";
        }, 300);
    }, 3000);
}

// Redirigir al index
function redirectToHome() {
    window.location.href = "index.html";
}

// Autocompletar al hacer clic en una credencial demo
function setupDemoCards() {
    const demoCards = document.querySelectorAll(".demo-card-item");
    
    demoCards.forEach(card => {
        card.addEventListener("click", function() {
            const email = this.getAttribute("data-email");
            const password = this.getAttribute("data-password");
            
            if (email && password) {
                document.getElementById("email").value = email;
                document.getElementById("password").value = password;
                
                // Efecto visual de éxito
                const emailInput = document.getElementById("email");
                const passwordInput = document.getElementById("password");
                
                emailInput.style.borderColor = "#10B981";
                passwordInput.style.borderColor = "#10B981";
                
                setTimeout(() => {
                    emailInput.style.borderColor = "#E2E8F0";
                    passwordInput.style.borderColor = "#E2E8F0";
                }, 500);
            }
        });
    });
}

// Evento principal del formulario (versión completa)
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const btn = document.querySelector(".btn-primary");

    if (!email || !password) {
        showError("Por favor, completa todos los campos");
        document.getElementById(email ? "password" : "email").focus();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("Ingresa un correo electrónico válido");
        document.getElementById("email").focus();
        return;
    }

    const result = validateCredentials(email, password);

    if (result.success) {
        saveSession(result.user);
        
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Ingresando...</span>';
        btn.style.background = "linear-gradient(135deg, #10B981, #059669)";
        
        setTimeout(() => {
            redirectToHome();
        }, 800);
    } else {
        showError(result.message);
        document.getElementById("password").value = "";
        document.getElementById("password").focus();
        
        const inputs = document.querySelectorAll(".input-group input");
        inputs.forEach(input => {
            input.style.borderColor = "#DC2626";
            setTimeout(() => {
                input.style.borderColor = "#E2E8F0";
            }, 400);
        });
    }
});

// Inicializar autocompletado cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    setupDemoCards();
});