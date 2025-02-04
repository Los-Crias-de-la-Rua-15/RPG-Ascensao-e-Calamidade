// Função para confirmar exclusão da ficha
function confirmarExclusao(fichaId) {
    const confirmar = confirm("Tem certeza que deseja excluir esta ficha?");
    if (confirmar) {
      const ficha = document.getElementById(fichaId);
      ficha.remove();
    }
  }
  