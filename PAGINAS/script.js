// Importar os módulos necessários do Firebase
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Inicializar o Firebase com sua configuração
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVZ-CmUy3nopQ51PziGfk6EjWvpVH1q9U",
    authDomain: "rpg-bf68e.firebaseapp.com",
    projectId: "rpg-bf68e",
    storageBucket: "rpg-bf68e.firebasestorage.app",
    messagingSenderId: "1098256795397",
    appId: "1:1098256795397:web:c18b40c1715cd1c6d4996c",
    measurementId: "G-G1X064VEZD"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Obter a instância de autenticação

// Função para cadastro manual com email e senha
document.getElementById("manualRegistration").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Usando o método createUserWithEmailAndPassword do Firebase v9+
    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário registrado com sucesso:", user.email);
            alert("Cadastro realizado com sucesso!");
            window.location.href = "game.html"; // Redireciona para a página do jogo
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao cadastrar: " + errorMessage);
            console.log(errorCode, errorMessage);
        });
});

// Função para cadastro com o Google
document.getElementById("googleLoginBtn").addEventListener("click", function() {
    const provider = new GoogleAuthProvider();

    // Usando o método signInWithPopup do Firebase v9+
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Usuário registrado com o Google:", user.email);
            alert("Cadastro realizado com sucesso!");
            window.location.href = "game.html"; // Redireciona para a página do jogo
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao cadastrar com Google: " + errorMessage);
            console.log(errorCode, errorMessage);
        });
});
