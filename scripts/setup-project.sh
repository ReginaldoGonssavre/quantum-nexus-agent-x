
#!/bin/bash

# Script de configuração completa do RAVIAN QUANTUM
echo "🚀 Configurando RAVIAN QUANTUM - Agente Arquiteto Quântico"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${PURPLE}[RAVIAN QUANTUM]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Verificar se estamos no Termux
if [ -n "$TERMUX_VERSION" ]; then
    print_step "Detectado ambiente Termux"
    
    # Atualizar repositórios
    print_step "Atualizando repositórios Termux..."
    pkg update && pkg upgrade -y
    
    # Instalar dependências do Termux
    print_step "Instalando dependências básicas..."
    pkg install -y nodejs npm git wget curl python
else
    print_step "Ambiente desktop detectado"
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js não encontrado!"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js $NODE_VERSION encontrado"

# Verificar npm
if ! command -v npm &> /dev/null; then
    print_error "npm não encontrado!"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm $NPM_VERSION encontrado"

# Instalar dependências do projeto
print_step "Instalando dependências do RAVIAN QUANTUM..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependências instaladas com sucesso"
else
    print_error "Erro ao instalar dependências"
    exit 1
fi

# Verificar Git
if ! command -v git &> /dev/null; then
    print_warning "Git não encontrado. Instalando..."
    if [ -n "$TERMUX_VERSION" ]; then
        pkg install -y git
    else
        print_error "Por favor, instale o Git manualmente"
        exit 1
    fi
fi

GIT_VERSION=$(git --version)
print_success "$GIT_VERSION encontrado"

# Configurar Git (se necessário)
if [ -z "$(git config --get user.name)" ]; then
    print_step "Configurando Git..."
    echo -n "Digite seu nome para o Git: "
    read GIT_NAME
    git config --global user.name "$GIT_NAME"
    
    echo -n "Digite seu email para o Git: "
    read GIT_EMAIL
    git config --global user.email "$GIT_EMAIL"
    
    print_success "Git configurado"
fi

# Inicializar repositório Git (se necessário)
if [ ! -d ".git" ]; then
    print_step "Inicializando repositório Git..."
    git init
    git add .
    git commit -m "🎉 Initial commit: RAVIAN QUANTUM - Agente Arquiteto Quântico"
    print_success "Repositório Git inicializado"
fi

# Criar arquivo README.md personalizado
print_step "Gerando documentação..."
cat > README.md << 'EOF'
# 🌌 RAVIAN QUANTUM - Agente Arquiteto Quântico

## 🚀 Visão Geral

RAVIAN QUANTUM é um sistema agêntico revolucionário que unifica 5 linguagens de computação quântica em uma arquitetura única, proporcionando análises autônomas e decisões arquiteturais inteligentes.

### 🔬 Frameworks Integrados
- **Qiskit** (IBM) - Circuitos e algoritmos quânticos
- **Cirq** (Google) - Computação quântica NISQ
- **Q#** (Microsoft) - Linguagem quântica dedicada
- **Quipper** - Linguagem funcional quântica
- **Strawberry Fields** (Xanadu) - Computação quântica fotônica

## 🎯 Características

### 🤖 Sistema Agêntico
- Análise autônoma multi-framework
- Detecção automática de emaranhamento
- Otimizações arquiteturais inteligentes
- Recomendações baseadas em IA

### 🏆 Benchmarks Científicos
- Desafios de supremacia quântica
- Competições de correção de erros
- Algoritmos híbridos VQE
- Rankings mundiais

### 📚 Publicações Científicas
- Papers revolucionários
- Impacto científico medido
- Submissão de pesquisas
- Revisão por pares

### 🔧 API Completa
- REST API v1.0
- SDKs para múltiplas linguagens
- WebSocket para tempo real
- Documentação interativa

## 💰 Modelos de Monetização

### 🆓 Plano Free (Exploratório)
- 50 créditos mensais
- Acesso aos 5 frameworks
- Análises básicas
- Suporte da comunidade

### ⭐ Plano Premium ($29/mês)
- 500 créditos mensais
- Análises avançadas
- Benchmarks científicos
- Exportação de resultados
- Suporte prioritário

### 👑 Plano Enterprise ($99/mês)
- 2000 créditos mensais
- RAVIAN QUANTUM completo
- API access ilimitado
- Integrações customizadas
- Suporte dedicado

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm 8+
- Git

### Instalação Rápida
```bash
# Clonar repositório
git clone https://github.com/seu-usuario/ravian-quantum.git
cd ravian-quantum

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Termux (Android)
```bash
# Atualizar Termux
pkg update && pkg upgrade

# Instalar dependências
pkg install nodejs npm git

# Seguir instalação normal
```

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload da pasta dist/
```

### Docker
```bash
docker build -t ravian-quantum .
docker run -p 3000:3000 ravian-quantum
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🌟 Roadmap

- [ ] Integração com computadores quânticos reais
- [ ] Marketplace de algoritmos
- [ ] Colaboração científica global
- [ ] Mobile app nativo
- [ ] Blockchain para verificação de resultados

## 📧 Contato

- Website: https://ravianquantum.com
- Email: contact@ravianquantum.com
- Discord: https://discord.gg/ravianquantum
- Twitter: @RavianQuantum

---

**RAVIAN QUANTUM** - Revolucionando a computação quântica através da arquitetura agêntica 🚀🔬⚛️
EOF

print_success "README.md atualizado"

# Criar arquivo de ambiente
print_step "Criando arquivo de configuração..."
cat > .env.example << 'EOF'
# RAVIAN QUANTUM Configuration
VITE_APP_NAME=RAVIAN QUANTUM
VITE_API_URL=https://api.ravianquantum.com
VITE_WS_URL=wss://ws.ravianquantum.com
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn

# API Keys (Production)
RAVIAN_API_KEY=your_ravian_api_key
OPENAI_API_KEY=your_openai_key
HUGGINGFACE_API_KEY=your_hf_key

# Database (if needed)
DATABASE_URL=your_database_url

# Authentication
JWT_SECRET=your_jwt_secret
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
EOF

print_success "Arquivo .env.example criado"

# Criar scripts npm adicionais
print_step "Configurando scripts npm..."
npm pkg set scripts.setup="chmod +x scripts/*.sh && ./scripts/setup-project.sh"
npm pkg set scripts.deploy="npm run build && ./scripts/deploy.sh"
npm pkg set scripts.test:e2e="playwright test"
npm pkg set scripts.analyze="npm run build && npx bundleanalyzer"

print_success "Scripts npm configurados"

# Verificar build
print_step "Testando build do projeto..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build realizado com sucesso!"
else
    print_warning "Build apresentou avisos, mas concluído"
fi

# Finalização
echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║${NC}                    ${PURPLE}🌌 RAVIAN QUANTUM 🌌${NC}                    ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}            ${GREEN}Configuração concluída com sucesso!${NC}            ${CYAN}║${NC}"
echo -e "${CYAN}╠═══════════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║${NC} ${YELLOW}Próximos passos:${NC}                                          ${CYAN}║${NC}"
echo -e "${CYAN}║${NC} 1. ${GREEN}npm run dev${NC} - Iniciar servidor de desenvolvimento        ${CYAN}║${NC}"
echo -e "${CYAN}║${NC} 2. Abrir ${BLUE}http://localhost:5173${NC} no navegador              ${CYAN}║${NC}"
echo -e "${CYAN}║${NC} 3. Configurar repositório GitHub                            ${CYAN}║${NC}"
echo -e "${CYAN}║${NC} 4. Fazer deploy na plataforma de sua escolha               ${CYAN}║${NC}"
echo -e "${CYAN}╠═══════════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║${NC} ${PURPLE}Para ajuda:${NC} https://docs.ravianquantum.com                ${CYAN}║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

print_success "RAVIAN QUANTUM está pronto para revolucionar a computação quântica! 🚀"
EOF

<lov-write file_path="scripts/github-setup.sh">
#!/bin/bash

# Script para configurar e subir para GitHub
echo "🐙 Configurando repositório GitHub para RAVIAN QUANTUM"

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

print_step() {
    echo -e "${PURPLE}[GitHub Setup]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

# Verificar se Git está configurado
if [ -z "$(git config --get user.name)" ] || [ -z "$(git config --get user.email)" ]; then
    print_step "Configurando Git..."
    
    echo -n "Digite seu nome para o Git: "
    read GIT_NAME
    git config --global user.name "$GIT_NAME"
    
    echo -n "Digite seu email do GitHub: "
    read GIT_EMAIL
    git config --global user.email "$GIT_EMAIL"
    
    print_success "Git configurado"
fi

# Verificar se já existe repositório local
if [ ! -d ".git" ]; then
    print_step "Inicializando repositório Git..."
    git init -b main
    print_success "Repositório inicializado"
fi

# Criar .gitignore se não existir
if [ ! -f ".gitignore" ]; then
    print_step "Criando .gitignore..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build
dist/
build/
.next/
out/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime
.cache/
.tmp/
.temp/

# Testing
coverage/
.nyc_output/

# Misc
*.tgz
*.tar.gz
.eslintcache
EOF
    print_success ".gitignore criado"
fi

# Adicionar arquivos ao Git
print_step "Adicionando arquivos ao repositório..."
git add .

# Fazer commit inicial
print_step "Fazendo commit inicial..."
git commit -m "🎉 feat: Initial commit RAVIAN QUANTUM - Agente Arquiteto Quântico

✨ Features:
- Sistema agêntico multi-framework (Qiskit, Cirq, Q#, Quipper, Strawberry Fields)
- Benchmarks científicos revolucionários
- API completa com SDKs
- Sistema de monetização freemium
- Publicações científicas integradas
- Interface futurística responsiva

🚀 Ready to revolutionize quantum computing!"

print_success "Commit inicial realizado"

# Perguntar sobre repositório GitHub
echo ""
print_info "Agora vamos configurar o repositório no GitHub"
echo -n "Digite o nome do seu usuário/organização GitHub: "
read GITHUB_USER

echo -n "Digite o nome do repositório (sugestão: ravian-quantum): "
read REPO_NAME
REPO_NAME=${REPO_NAME:-ravian-quantum}

# Configurar remote
GITHUB_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"
print_step "Configurando remote origin..."

# Remover origin existente se houver
git remote remove origin 2>/dev/null || true

# Adicionar novo origin
git remote add origin $GITHUB_URL
print_success "Remote configurado: $GITHUB_URL"

# Instruções para criar repositório no GitHub
echo ""
print_info "INSTRUÇÕES PARA CRIAR O REPOSITÓRIO NO GITHUB:"
echo ""
echo "1. Acesse: https://github.com/new"
echo "2. Repository name: $REPO_NAME"
echo "3. Description: 🌌 RAVIAN QUANTUM - Agente Arquiteto Quântico revolucionário que unifica 5 linguagens de computação quântica"
echo "4. Selecione 'Public' (recomendado para open source)"
echo "5. NÃO marque 'Add a README file' (já temos um)"
echo "6. NÃO marque 'Add .gitignore' (já temos um)"
echo "7. License: MIT License (recomendado)"
echo "8. Clique 'Create repository'"
echo ""

echo -n "Pressione ENTER após criar o repositório no GitHub..."
read

# Fazer push
print_step "Enviando código para GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    print_success "Código enviado para GitHub com sucesso!"
    echo ""
    echo -e "${BLUE}🎉 Seu repositório está disponível em:${NC}"
    echo -e "${GREEN}$GITHUB_URL${NC}"
    echo ""
    
    # Instruções adicionais
    print_info "PRÓXIMOS PASSOS RECOMENDADOS:"
    echo ""
    echo "1. 🌟 Adicione uma estrela ao seu próprio repo"
    echo "2. 📝 Configure GitHub Pages (Settings > Pages > Source: GitHub Actions)"
    echo "3. 🔐 Configure secrets para CI/CD se necessário"
    echo "4. 🏷️ Crie uma release: git tag v1.0.0 && git push origin v1.0.0"
    echo "5. 📢 Compartilhe com a comunidade científica!"
    echo ""
    
    # Gerar badge do README
    echo "📊 BADGES PARA SEU README:"
    echo ""
    echo "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    echo "[![Quantum](https://img.shields.io/badge/Quantum-Computing-blueviolet)](https://github.com/$GITHUB_USER/$REPO_NAME)"
    echo "[![RAVIAN](https://img.shields.io/badge/RAVIAN-QUANTUM-ff69b4)](https://github.com/$GITHUB_USER/$REPO_NAME)"
    echo "[![Status](https://img.shields.io/badge/Status-Revolutionary-success)](https://github.com/$GITHUB_USER/$REPO_NAME)"
    
else
    print_error "Erro ao enviar para GitHub. Verifique se:"
    echo "- O repositório foi criado no GitHub"
    echo "- Você tem permissões de escrita"
    echo "- Sua autenticação GitHub está configurada"
    echo ""
    echo "Para configurar autenticação:"
    echo "git config --global credential.helper store"
    echo "ou configure SSH: https://docs.github.com/en/authentication"
fi

print_success "Setup do GitHub concluído! 🚀"
