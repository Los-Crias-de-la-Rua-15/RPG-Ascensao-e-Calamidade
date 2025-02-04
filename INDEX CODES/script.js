function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const button = document.querySelector('.image-button');

    // Verifica se o clique foi fora da sidebar e do botão de abrir
    if (!sidebar.contains(event.target) && !button.contains(event.target)) {
        sidebar.classList.remove('open');
    }
});