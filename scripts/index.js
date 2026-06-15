document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-content');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('aria-controls');

            tabs.forEach((t) => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });

            panels.forEach((panel) => {
                panel.classList.remove('active');
                panel.setAttribute('hidden', '');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const targetPanel = document.getElementById(targetId);
            targetPanel.classList.add('active');
            targetPanel.removeAttribute('hidden');
        });
    });
});

function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "login.html";
}

function checkActiveSession() {
    const currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    checkActiveSession();  // Verifica si ya hay una sesion activa
});