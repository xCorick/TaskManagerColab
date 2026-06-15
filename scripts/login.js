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

// Evento principal del formulario (versión simple)
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
        // Por ahora solo mostramos éxito en consola
        console.log("Login exitoso:", result.user);
        alert("Inicio de sesión exitoso (demo)");
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