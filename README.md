# Destinos Incríveis — Site completo

Este pacote contém todas as páginas do site, prontas para hospedar no **GitHub Pages**.

## Arquivos

- `index.html` → Página inicial (Home)
- `midia-kit.html` → Mídia Kit para marcas e parcerias
- `clube.html` → Página de vendas do Destinos Incríveis Club
- `obrigado-clube.html` → Página de agradecimento pós-compra do Clube (usar como "página de obrigado" no Kiwify)

Todos os links entre as páginas já estão conectados corretamente (usando links relativos), então **não renomeie os arquivos** a menos que atualize os links também.

## Como hospedar no GitHub Pages (passo a passo)

1. **Crie um repositório novo no GitHub**
   - Acesse github.com → clique em "New repository"
   - Dê um nome, ex: `destinos-incriveis` (pode ser público ou privado, mas para GitHub Pages gratuito precisa ser público)
   - Não adicione README, .gitignore ou licença (deixe vazio)

2. **Suba os arquivos**
   - Na página do repositório recém-criado, clique em "uploading an existing file"
   - Arraste os 4 arquivos `.html` deste pacote
   - Clique em "Commit changes"

3. **Ative o GitHub Pages**
   - Vá em **Settings** (nas abas do repositório)
   - No menu lateral, clique em **Pages**
   - Em "Source", selecione a branch `main` (ou `master`) e a pasta `/ (root)`
   - Clique em **Save**

4. **Aguarde e acesse**
   - Em 1-2 minutos o GitHub vai gerar uma URL parecida com:
     `https://SEU-USUARIO.github.io/destinos-incriveis/`
   - Essa é a sua página inicial (`index.html`)
   - As demais páginas ficam em:
     - `https://SEU-USUARIO.github.io/destinos-incriveis/midia-kit.html`
     - `https://SEU-USUARIO.github.io/destinos-incriveis/clube.html`
     - `https://SEU-USUARIO.github.io/destinos-incriveis/obrigado-clube.html`

## Configurar a página de obrigado no Kiwify

No painel do Kiwify, no produto "Destinos Incríveis Club", procure a opção de **URL de redirecionamento pós-compra / página de obrigado** e cole o link:
`https://SEU-USUARIO.github.io/destinos-incriveis/obrigado-clube.html`

## Domínio próprio (opcional)

Se você comprar um domínio (ex: destinosincriveis.com.br), o GitHub Pages permite configurar um domínio customizado em Settings → Pages → Custom domain. Nesse caso, basta apontar o DNS do domínio para o GitHub conforme a documentação oficial.

## Formulário de contato (Web3Forms)

O formulário na página `midia-kit.html` já está configurado com sua Access Key do Web3Forms e funciona automaticamente assim que o site estiver no ar — não precisa de nenhum servidor adicional.
