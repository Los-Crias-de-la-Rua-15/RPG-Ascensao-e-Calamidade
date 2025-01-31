// Configuração do Firebase
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-auth-domain",
    projectId: "seu-project-id",
    storageBucket: "seu-storage-bucket",
    messagingSenderId: "seu-messaging-sender-id",
    appId: "seu-app-id"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função para cadastro manual com email e senha
document.getElementById("manualRegistration").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    auth.createUserWithEmailAndPassword(email, senha)
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
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
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
