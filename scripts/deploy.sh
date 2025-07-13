
#!/bin/bash

# Script de deploy automatizado
echo "🚀 Deploy RAVIAN QUANTUM - Agente Arquiteto Quântico"

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
NC='\033[0m'

print_step() {
    echo -e "${PURPLE}[Deploy]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

# Verificar se está em um repositório Git
if [ ! -d ".git" ]; then
    print_error "Este não é um repositório Git. Execute primeiro: ./scripts/github-setup.sh"
    exit 1
fi

# Build do projeto
print_step "Fazendo build do projeto..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Erro no build. Corrija os erros antes de fazer deploy."
    exit 1
fi

print_success "Build concluído com sucesso"

# Verificar se há mudanças para commit
if ! git diff-index --quiet HEAD --; then
    print_step "Commitando mudanças..."
    git add .
    
    echo -n "Digite a mensagem do commit (ou pressione ENTER para usar padrão): "
    read COMMIT_MSG
    
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="🚀 deploy: Update RAVIAN QUANTUM $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    git commit -m "$COMMIT_MSG"
    print_success "Commit realizado"
fi

# Push para GitHub
print_step "Enviando para GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    print_error "Erro ao enviar para GitHub"
    exit 1
fi

print_success "Código enviado para GitHub"

# Menu de opções de deploy
echo ""
print_info "Escolha a plataforma de deploy:"
echo "1) Vercel (Recomendado)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Heroku"
echo "5) Manual (apenas build)"
echo -n "Escolha uma opção (1-5): "
read DEPLOY_OPTION

case $DEPLOY_OPTION in
    1)
        print_step "Configurando deploy no Vercel..."
        
        # Verificar se Vercel CLI está instalado
        if ! command -v vercel &> /dev/null; then
            print_step "Instalando Vercel CLI..."
            npm install -g vercel
        fi
        
        # Deploy para Vercel
        print_step "Fazendo deploy para Vercel..."
        vercel --prod
        
        if [ $? -eq 0 ]; then
            print_success "Deploy no Vercel concluído!"
            print_info "Seu RAVIAN QUANTUM está no ar! 🌐"
        else
            print_error "Erro no deploy do Vercel"
        fi
        ;;
        
    2)
        print_step "Configurando deploy no Netlify..."
        
        # Verificar se Netlify CLI está instalado
        if ! command -v netlify &> /dev/null; then
            print_step "Instalando Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        # Deploy para Netlify
        print_step "Fazendo deploy para Netlify..."
        netlify deploy --prod --dir=dist
        
        if [ $? -eq 0 ]; then
            print_success "Deploy no Netlify concluído!"
        else
            print_error "Erro no deploy do Netlify"
        fi
        ;;
        
    3)
        print_step "Configurando GitHub Pages..."
        
        # Criar branch gh-pages se não existir
        git checkout -b gh-pages 2>/dev/null || git checkout gh-pages
        
        # Copiar arquivos de build
        cp -r dist/* .
        
        # Commit e push
        git add .
        git commit -m "🚀 deploy: GitHub Pages deployment"
        git push -f origin gh-pages
        
        # Voltar para main
        git checkout main
        
        print_success "Deploy no GitHub Pages configurado!"
        print_info "Ative o GitHub Pages nas configurações do repositório"
        ;;
        
    4)
        print_step "Configurando deploy no Heroku..."
        
        # Verificar se Heroku CLI está instalado
        if ! command -v heroku &> /dev/null; then
            print_error "Heroku CLI não encontrado. Instale em: https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        
        # Criar Procfile se não existir
        if [ ! -f "Procfile" ]; then
            echo "web: npm run preview" > Procfile
            git add Procfile
            git commit -m "📝 add: Procfile para Heroku"
        fi
        
        echo -n "Digite o nome da sua app Heroku: "
        read HEROKU_APP
        
        # Criar app no Heroku
        heroku create $HEROKU_APP 2>/dev/null || true
        
        # Deploy
        git push heroku main
        
        if [ $? -eq 0 ]; then
            print_success "Deploy no Heroku concluído!"
            print_info "App disponível em: https://$HEROKU_APP.herokuapp.com"
        else
            print_error "Erro no deploy do Heroku"
        fi
        ;;
        
    5)
        print_success "Build manual concluído!"
        print_info "Arquivos estão na pasta 'dist/'"
        print_info "Você pode fazer upload manual para qualquer servidor web"
        ;;
        
    *)
        print_error "Opção inválida"
        exit 1
        ;;
esac

# Instruções finais
echo ""
print_success "🎉 Deploy do RAVIAN QUANTUM concluído!"
echo ""
print_info "📋 CHECKLIST PÓS-DEPLOY:"
echo "✅ Testar todas as funcionalidades"
echo "✅ Verificar responsividade mobile"
echo "✅ Configurar domínio customizado (opcional)"
echo "✅ Configurar analytics (opcional)"
echo "✅ Compartilhar com a comunidade científica!"
echo ""
print_info "🌟 Não esqueça de marcar repositório com estrela no GitHub!"
