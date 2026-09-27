# Moratech Informática

Site institucional estático em português para a Moratech, em Indaiatuba. A home apresenta 16 seções com visual roxo uva, imagens de produtos, cartões com profundidade, progresso de leitura, movimento sutil ao rolar e chamadas para parcerias empresariais. Há 12 páginas completas de soluções, além do catálogo, Sobre e Contato.

## Desenvolvimento

Execute `node build.mjs` nesta pasta para gerar as páginas em `dist/`. Execute `node check.mjs` para verificar páginas, links internos, ativos e quantidade de seções. Para prévia local, execute `node preview.mjs` e abra http://127.0.0.1:4173/.

O conteúdo fica em `content.mjs`, a home em `home.mjs` e os modelos das páginas em `build.mjs`. `dist/styles.css` contém a identidade visual e os estados responsivos; `dist/script.js` cuida do menu, filtros, preferência de movimento e rolagem. Os links de contato abrem `wa.me/5519991811853` com mensagens específicas para cada assunto. Não há formulário, backend ou armazenamento de dados.

## Vercel

Este site fica na pasta `site` do repositório do GitHub. Na Vercel, defina **Root Directory** como `site`. O arquivo `vercel.json` seleciona o tipo de projeto **Other**, executa `node build.mjs` e publica os arquivos de `dist/`. Depois de alterar o Root Directory de um projeto já criado, inicie um novo deploy.

## Imagens

`dist/assets/fachada-mora.png` é a foto da fachada fornecida pelo usuário. As imagens abaixo foram geradas para este projeto:

- `hero-tech.png`: notebook, câmera e switch sobre fundo escuro com luz roxa.
- `security-camera.png`: câmera branca de segurança sobre fundo claro.
- `network-rack.png`: rack de rede com cabeamento organizado e tons roxos.
- `computer-upgrade.png`: técnico instalando SSD em PC aberto sob iluminação roxa.
- `upgrade-components.png`: memórias RAM e SSD preparados para um upgrade.
- `notebook-repair.png`: técnico reparando notebook aberto em bancada sob iluminação roxa.

São ilustrativas; não representam estoque ou instalações reais da Moratech.

`datacaixa-pdv.jpg` e `datacaixa-gestao.jpg` são imagens de interface obtidas da [página de preços do fornecedor](https://www.datacaixa.com.br/precos/). A página do serviço informa a origem e que telas e recursos podem variar conforme versão e plano.

## Dados públicos

- Perfil fornecido: https://share.google/pYHM3rumm55DHR7Yc
- Endereço e telefone comercial: https://www.indaiatubafacil.com.br/guia/compras/produtos-informatica.asp?c=163
- Recursos gerais do parceiro Datacaixa: https://www.datacaixa.com.br/
- Referência sobre certificados digitais: https://www.gov.br/iti/pt-br/acesso-a-informacao/perguntas-frequentes/certificacao-digital

Horários são consultados pelo perfil do Google. O número de WhatsApp foi confirmado pelo usuário nesta revisão; a recepção das mensagens não foi testada. O nome tipográfico do site é uma proposta visual, não um logotipo oficial fornecido pela empresa.
