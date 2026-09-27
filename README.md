# Moratech Informática

O código do site está na pasta [`site`](site/). Ela contém os arquivos de origem, as imagens e o resultado estático em `dist/`.

## Publicar na Vercel

Ao importar este repositório do GitHub, configure **Root Directory** como `site` em **Settings → Build and Deployment**. O arquivo `site/vercel.json` define o comando `node build.mjs` e publica a pasta `dist`.

Depois de salvar essa opção, faça um novo deploy em **Deployments → Redeploy**. Os próximos commits na branch `main` poderão gerar novos deploys automaticamente.

Para desenvolvimento e verificação local, consulte [`site/README.md`](site/README.md).
