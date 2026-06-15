// DATOS SIMULADOS DEL USUARIO ADMINISTRADOR

// Usuario unico para el sistema. Solo el administrador puede acceder.
const USERS = [
    {
        id: 1,
        email: "admin@softdev.com",
        password: "admin123",
        name: "Administrador",
        role: "admin"
    }
];

// FUNCIONES DE VALIDACION Y AUTENTICACION

// Funcion que verifica si las credenciales ingresadas son correctas
// Recibe email y password, retorna un objeto con exito o error
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
        message: "Correo o contrasena incorrectos"
    };
}

// FUNCIONES DE GESTION DE SESION

// Guarda la informacion del usuario en sessionStorage y localStorage
// La sesion persiste mientras la pestaña del navegador este abierta
function saveSession(user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("lastLogin", new Date().toISOString());
}

// Verifica si ya existe una sesion activa
// Si existe, redirige al index para evitar volver al login
function checkActiveSession() {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
        window.location.href = "index.html";
    }
}

// FUNCIONES DE INTERFAZ DE USUARIO

// Muestra un mensaje de error en la interfaz
// El mensaje desaparece automaticamente a los 3 segundos
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

// Redirige al usuario a la pagina principal del dashboard
function redirectToHome() {
    window.location.href = "index.html";
}

// FUNCION DE AUTOCOMPLETADO DE CREDENCIALES

// Configura el evento de clic en la tarjeta de credenciales
// Al hacer clic, autocompleta los campos del formulario
function setupDemoCard() {
    const demoCard = document.querySelector(".demo-card-item");
    
    if (demoCard) {
        demoCard.addEventListener("click", function() {
            const email = this.getAttribute("data-email");
            const password = this.getAttribute("data-password");
            
            if (email && password) {
                document.getElementById("email").value = email;
                document.getElementById("password").value = password;
                
                // Efecto visual temporal en los bordes
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
    }
}

// EVENTO PRINCIPAL DEL FORMULARIO DE LOGIN

// Maneja el envio del formulario de login
// Valida campos, credenciales y gestiona la redireccion
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const btn = document.querySelector(".btn-primary");

    // Validacion de campos vacios
    if (!email || !password) {
        showError("Por favor, completa todos los campos");
        document.getElementById(email ? "password" : "email").focus();
        return;
    }

    // Validacion del formato de correo electronico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("Ingresa un correo electronico valido");
        document.getElementById("email").focus();
        return;
    }

    // Validacion de credenciales contra los datos simulados
    const result = validateCredentials(email, password);

    if (result.success) {
        saveSession(result.user);
        
        // Cambiar el texto y color del boton mientras se procesa
        btn.innerHTML = '<span>Ingresando...</span>';
        btn.style.background = "linear-gradient(135deg, #10B981, #059669)";
        
        // Redirigir al dashboard despues de un breve retraso
        setTimeout(() => {
            redirectToHome();
        }, 800);
    } else {
        showError(result.message);
        document.getElementById("password").value = "";
        document.getElementById("password").focus();
        
        // Efecto visual de error en los campos
        const inputs = document.querySelectorAll(".input-group input");
        inputs.forEach(input => {
            input.style.borderColor = "#DC2626";
            setTimeout(() => {
                input.style.borderColor = "#E2E8F0";
            }, 400);
        });
    }
});

// INICIALIZACION AL CARGAR LA PAGINA

// Se ejecuta cuando el DOM esta completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    checkActiveSession();  // Verifica si ya hay una sesion activa
    setupDemoCard();       // Configura el autocompletado de credenciales
});