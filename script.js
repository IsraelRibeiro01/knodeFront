document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const newPostForm = document.getElementById('new-post-form');

    // --- Lógica do Seletor de Temas (Funciona em todas as páginas) ---

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
    };

    const saveTheme = (theme) => {
        localStorage.setItem('theme', theme);
    };

    if (themeSelect) {
        themeSelect.addEventListener('change', () => {
            const selectedTheme = themeSelect.value;
            applyTheme(selectedTheme);
            saveTheme(selectedTheme);
        });
    }

    const loadSavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && themeSelect) {
            themeSelect.value = savedTheme;
            applyTheme(savedTheme);
        }
    };

    // --- Lógica do Formulário de Novo Post (Só na página add-post.html) ---

    if (newPostForm) {
        newPostForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            // Captura os valores do formulário
            const author = document.getElementById('post-author').value;
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;

            const newPostData = {
                author,
                title,
                content,
                date: new Date().toISOString() // Usar ISO string para consistência
            };

            // **Ponto de integração com o Backend**
            console.log('Dados do novo post para enviar ao backend:', newPostData);
            alert('Publicação simulada com sucesso! Redirecionando para a página inicial.');

            // Redireciona para a página inicial após a simulação
            window.location.href = 'index.html';
        });
    }

    // --- Inicialização ---
    loadSavedTheme();
});