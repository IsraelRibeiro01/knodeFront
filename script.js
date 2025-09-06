document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos Globais ---
    const themeSelect = document.getElementById('theme-select');
    
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
    const newPostForm = document.getElementById('new-post-form');
    if (newPostForm) {
        newPostForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newPostData = {
                author: document.getElementById('post-author').value,
                title: document.getElementById('post-title').value,
                content: document.getElementById('post-content').value,
                date: new Date().toISOString()
            };
            console.log('Dados do novo post para enviar ao backend:', newPostData);
            alert('Publicação simulada com sucesso! Redirecionando para a página inicial.');
            window.location.href = 'index.html';
        });
    }

    // --- Lógica do Modal de Post (Só na página index.html) ---
    const postModal = document.getElementById('post-modal');
    const postsContainer = document.getElementById('posts-container');
    
    if (postModal && postsContainer) {
        const modalContent = document.getElementById('modal-post-content');
        const closeButton = document.querySelector('.close-button');

        // Abrir o modal ao clicar em um post
        postsContainer.addEventListener('click', (event) => {
            const clickedPost = event.target.closest('.post');
            if (clickedPost) {
                // Clona o post clicado para dentro do modal
                const postClone = clickedPost.cloneNode(true);
                modalContent.innerHTML = ''; // Limpa o conteúdo anterior
                modalContent.appendChild(postClone);
                postModal.style.display = 'block';
            }
        });

        // Fechar o modal no botão 'X'
        closeButton.addEventListener('click', () => {
            postModal.style.display = 'none';
        });

        // Fechar o modal ao clicar fora do conteúdo
        window.addEventListener('click', (event) => {
            if (event.target === postModal) {
                postModal.style.display = 'none';
            }
        });
    }

    // --- Inicialização ---
    loadSavedTheme();
});
