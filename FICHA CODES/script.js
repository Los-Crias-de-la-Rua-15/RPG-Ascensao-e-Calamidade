// Função para atualizar o conteúdo na área central
function updateContent(content) {
  document.getElementById('content-area').innerHTML = `<p>${content}</p>`;
}

// Função para criar a estrutura das abas
function createTabbedScreen() {
  document.getElementById('content-area').innerHTML = `
    <div class="tabs">
      <button class="tab" onclick="showTabContent('tab1')">Informações Pessoais</button>
      <button class="tab" onclick="showTabContent('tab2')">Atributos Vitais</button>
      <button class="tab" onclick="showTabContent('tab3')">Aba 3</button>
    </div>
    <div id="tab-content" class="tab-content">
      <p>Selecione uma aba para ver o conteúdo.</p>
    </div>
  `;
}

// Função para exibir o conteúdo da aba selecionada
function showTabContent(tabId) {
  const contentMap = {
    tab1: showPersonalInfo(),
    tab2: showLifeBars(),
    tab3: showAttributesAndStatus(),
  };
  
  document.getElementById('tab-content').innerHTML = contentMap[tabId] || '<p>Conteúdo não encontrado.</p>';
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector(`[onclick="showTabContent('${tabId}')"]`).classList.add('active');
}

// Função para exibir as informações pessoais na "Aba 1"
function showPersonalInfo() {
  return `
    <div id="info-area" class="info-area">
      <div class="profile-picture">
        <img src="FICHA CODES/IMAGENS/profile.jpg" alt="Imagem do perfil">
      </div>
      <div class="personal-info">
        ${['Nome: Gabriel', 'Idade: 20 anos', 'Altura: 1,75m', 'Sexo: Masculino', 'Raça: Humano', 'Sexualidade: Bissexual', 'História: Sempre em busca de conhecimento e novos desafios.']
          .map(info => `<div class="info-card"><p><strong>${info.split(': ')[0]}:</strong> ${info.split(': ')[1]}</p></div>`).join('')}
      </div>
    </div>
  `;
}

function showLifeBars() {
  const bars = ['bar1', 'bar2', 'bar3', 'bar4', 'bar5'].map((bar, index) => {
    const value = localStorage.getItem(bar) || Math.floor(Math.random() * 101);
    const maxValue = 100; // Definindo o valor máximo como 100 para todas as barras
    return `
      <div class="life-bar">
        <label for="${bar}">
        <p>${getBarName(index)}</p>
        </label>
        <progress id="${bar}" value="${value}" max="${maxValue}"></progress>
        <span id="${bar}-value">${value}/${maxValue}</span>
      </div>
    `;
  }).join('');

  return `
    <h2>Barras de Vida</h2>
    <div id="life-bars">${bars}</div>
    <button onclick="updateBars()">Alterar Barras</button>
  `;
}

function getBarColor(index) {
  const colors = ['rgb(145, 67, 58)', 'rgb(103, 145, 66)', 'rgb(49, 46, 204)', '#3498db', 'rgb(47, 8, 8)'];
  return colors[index];
}

function getBarName(index) {
  const names = ['Saúde', 'Estamina', 'Integridade', 'Força Espiritual', 'Sanidade'];
  return names[index];
}


// Função para atualizar as barras de vida e salvar no localStorage
function updateBars() {
  ['bar1', 'bar2', 'bar3', 'bar4', 'bar5'].forEach(bar => {
    const value = Math.floor(Math.random() * 101);
    const maxValue = 100;
    localStorage.setItem(bar, value);
    document.getElementById(bar).value = value;
    document.getElementById(`${bar}-value`).innerText = `${value}/${maxValue}`;
  });
}

// Função para exibir a aba 3 com atributos e status
function showAttributesAndStatus() {
  const attributeNames = [
    'FOR', 'AGI', 'CON', 'INT', 'SAB', 'CAR', 'VON', 'SOR'
  ]
  const attributes = Array.from({ length:8 }, (_,i) =>{
    const attr = `atr${i + 1}`;
    return `
      <div class="attribute">
        <p>${attributeNames[i]}</p>
        <img src="static\attr\PNG\FOR${i + 1}.png" alt="Imagem do Atributo ${i + 1}" class="attribute-image">
        <button onclick="updateAttribute('${attr}', -1)"><</button>
        <span id="${attr}-value">5</span>
        <button onclick="updateAttribute('${attr}', +1)">></button>
      </div>
    `;
  }).join('');

  const status = Array.from({ length: 8 }, (_, i) => {
    return `
      <div class="status-box">
        <img src="static\attr\PNG\FOR${i + 1}.png" alt="Imagem do Status ${i + 1}" class="status-image">
        <p>Status ${i + 1}</p>
        <span id="stts${i + 1}-value">0</span>
      </div>
    `;
  }).join('');

  return `
    <h2>Atributos e Status</h2>
    <div id="attributes-container" class="attributes-container">
      <div class="attributes">${attributes}</div>
      <div class="status">${status}</div>
    </div>
  `;
}

// Função para atualizar o valor dos atributos e os status
function updateAttribute(attribute, change) {
  const attributeValue = document.getElementById(`${attribute}-value`);
  let currentValue = parseInt(attributeValue.innerText) + change;
  currentValue = currentValue < 0 ? 0 : currentValue;
  attributeValue.innerText = currentValue;
  document.getElementById(`stts${attribute.substring(3)}-value`).innerText = currentValue;
}
