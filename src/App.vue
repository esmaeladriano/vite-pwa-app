<script setup>
import { ref, onMounted } from 'vue'

const installPrompt = ref(null)
const showInstallButton = ref(false)

onMounted(() => {
  // Força o prompt de instalação após 2 segundos
  setTimeout(() => {
    const event = new Event('beforeinstallprompt')
    window.dispatchEvent(event)
  }, 2000)

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    installPrompt.value = e
    showInstallButton.value = true
    console.log('Evento beforeinstallprompt disparado')
  })
})

const installApp = async () => {
  if (!installPrompt.value) {
    console.log('Nenhum prompt de instalação disponível')
    return
  }
  
  try {
    console.log('Solicitando instalação...')
    installPrompt.value.prompt()
    const { outcome } = await installPrompt.value.userChoice
    console.log(`Usuário ${outcome === 'accepted' ? 'aceitou' : 'rejeitou'} a instalação`)
    if (outcome === 'accepted') {
      showInstallButton.value = false
    }
  } catch (error) {
    console.error('Erro ao instalar o app:', error)
  }
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Meu App PWA</h1>
      <p>Bem-vindo ao meu aplicativo progressivo</p>
    </header>

    <main class="app-main">
      <div class="card">
        <h2>Funcionalidades</h2>
        <ul>
          <li>Funciona offline</li>
          <li>Pode ser instalado</li>
          <li>Rápido e responsivo</li>
        </ul>
      </div>
    </main>

    <button 
      v-if="showInstallButton" 
      @click="installApp"
      class="install-button"
    >
      📲 Instalar App
    </button>
  </div>
</template>

<style>
:root {
  --primary-color: #4DBA87;
  --text-color: #2c3e50;
  --bg-color: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin: 20px 0 40px;
}

.app-header h1 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.install-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.install-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}
</style>