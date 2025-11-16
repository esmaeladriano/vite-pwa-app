<script setup>
import { ref, onMounted } from 'vue'

const installPrompt = ref(null)
const showInstallButton = ref(false)
const isAppInstalled = ref(false)

// Verifica se o app já está instalado
const checkIfAppIsInstalled = () => {
  // Para navegadores que suportam getInstalledRelatedApps
  if ('getInstalledRelatedApps' in window) {
    window.getInstalledRelatedApps().then((relatedApps) => {
      isAppInstalled.value = relatedApps.length > 0
    })
  }
  
  // Verifica se está em modo standalone (já instalado)
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    isAppInstalled.value = true
  }
}

// Configura o evento de instalação
const setupInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Previne o prompt automático
    e.preventDefault()
    // Salva o evento para usar depois
    installPrompt.value = e
    // Mostra o botão de instalação
    showInstallButton.value = true
    console.log('✅ beforeinstallprompt event captured')
  })
  
  // Verifica se o app foi instalado com sucesso
  window.addEventListener('appinstalled', () => {
    console.log('🎉 App instalado com sucesso!')
    isAppInstalled.value = true
    showInstallButton.value = false
  })
}

// Inicia a instalação
const installApp = async () => {
  if (!installPrompt.value) {
    console.log('ℹ️ Nenhum prompt de instalação disponível')
    return
  }
  
  try {
    console.log('🔄 Solicitando instalação...')
    // Mostra o prompt de instalação
    installPrompt.value.prompt()
    // Espera o usuário responder
    const { outcome } = await installPrompt.value.userChoice
    console.log(`✅ Usuário ${outcome === 'accepted' ? 'aceitou' : 'rejeitou'} a instalação`)
    
    if (outcome === 'accepted') {
      isAppInstalled.value = true
      showInstallButton.value = false
    }
    
    // Limpa o prompt
    installPrompt.value = null
  } catch (error) {
    console.error('❌ Erro ao instalar o app:', error)
  }
}

// Inicialização
onMounted(() => {
  checkIfAppIsInstalled()
  setupInstallPrompt()
  
  // Para desenvolvimento: força a exibição do botão após 3 segundos
  setTimeout(() => {
    if (!isAppInstalled.value) {
      showInstallButton.value = true
    }
  }, 3000)
})
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Meu App PWA</h1>
      <p>Bem-vindo ao meu aplicativo progressivo</p>
      <p v-if="isAppInstalled" class="installed-badge">✅ App instalado</p>
    </header>

    <main class="app-main">
      <div class="card">
        <h2>Como instalar este app</h2>
        <ol>
          <li>Clique no botão "Instalar App" no canto inferior direito</li>
          <li>Siga as instruções na caixa de diálogo</li>
          <li>O app será instalado na sua área de trabalho</li>
        </ol>
        
        <div class="browser-hint" v-if="!showInstallButton && !isAppInstalled">
          <p>💡 Dica: No Chrome/Edge, procure pelo ícone de instalação (📥) na barra de endereço</p>
        </div>
      </div>
    </main>

    <!-- Botão de instalação flutuante -->
    <button 
      v-if="showInstallButton && !isAppInstalled" 
      @click="installApp"
      class="install-button"
      aria-label="Instalar aplicativo"
    >
      📲 Instalar App
    </button>
    
    <!-- Mensagem de sucesso após instalação -->
    <div v-if="isAppInstalled" class="success-message">
      <p>✅ Aplicativo instalado com sucesso!</p>
      <p>Você pode encontrá-lo na sua área de trabalho ou na lista de aplicativos.</p>
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #4DBA87;
  --text-color: #2c3e50;
  --bg-color: #f5f5f5;
  --success-color: #4CAF50;
  --warning-color: #FFC107;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px; /* Espaço para o botão flutuante */
}

.app-header {
  text-align: center;
  margin: 20px 0 40px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.app-header h1 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 2.2rem;
}

.installed-badge {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 15px;
  background-color: var(--success-color);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  line-height: 1.8;
}

.card h2 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.card ol {
  padding-left: 20px;
  margin: 15px 0;
}

.card li {
  margin-bottom: 10px;
}

.browser-hint {
  margin-top: 20px;
  padding: 15px;
  background-color: #FFF9C4;
  border-left: 4px solid var(--warning-color);
  border-radius: 4px;
}

.install-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 15px 30px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(77, 186, 135, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
}

.install-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(77, 186, 135, 0.6);
  background: #3da876;
}

.install-button:active {
  transform: translateY(1px);
}

.success-message {
  background-color: #E8F5E9;
  color: var(--success-color);
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
  text-align: center;
  border-left: 4px solid var(--success-color);
}

.success-message p {
  margin: 5px 0;
}

/* Animações */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.install-button {
  animation: pulse 2s infinite;
}

/* Responsividade */
@media (max-width: 600px) {
  .app {
    padding: 15px;
  }
  
  .app-header h1 {
    font-size: 1.8rem;
  }
  
  .install-button {
    bottom: 20px;
    right: 20px;
    left: 20px;
    width: calc(100% - 40px);
    justify-content: center;
  }
}
</style>