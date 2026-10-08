# Moratech Informática

O projeto atual está na pasta [`site`](site/). Ela contém os arquivos de origem, as imagens e o resultado estático em `dist/`. As antigas cópias de entrega e imagens de prévia foram mantidas apenas no computador local.

## Publicar na Vercel

Ao importar este repositório do GitHub, configure **Root Directory** como `site` em **Settings → Build and Deployment**. O arquivo `site/vercel.json` define o comando `node build.mjs` e publica a pasta `dist`.

Depois de salvar essa opção, faça um novo deploy em **Deployments → Redeploy**. Os próximos commits na branch `main` poderão gerar novos deploys automaticamente.

Para desenvolvimento e verificação local, consulte [`site/README.md`](site/README.md).

## Publicar na HostGator pelo Gerenciador de Arquivos

Execute `powershell -ExecutionPolicy Bypass -File site/package-hostgator.ps1` para gerar `moratech-hostgator.zip` na raiz deste projeto. O ZIP contém `index.html`, as demais páginas, `styles.css`, `script.js` e a pasta `assets/` diretamente na raiz, sem uma pasta `site` ou `dist` em volta.

No cPanel da HostGator, abra o **Gerenciador de Arquivos**, entre na raiz do domínio (normalmente `public_html` para o domínio principal), envie o ZIP e use **Extrair** nessa mesma pasta. Ao terminar, confirme que `public_html/index.html` e `public_html/assets/` aparecem lado a lado. O site é estático e não precisa de Node.js ou banco de dados na hospedagem.

Se houver um site antigo nessa pasta, faça uma cópia antes de substituí-lo; um `index.php` antigo ou regras próprias em `.htaccess` podem continuar controlando a página inicial. O pacote não altera o `.htaccess` existente.
