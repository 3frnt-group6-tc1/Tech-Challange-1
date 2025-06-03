# Roteiro para Vídeos de Apresentação

## Vídeo 1: Demonstração do Sistema

### 1. Introdução

- Apresentação rápida do grupo e do objetivo do sistema.
- Breve explicação sobre o propósito: facilitar o controle financeiro pessoal, permitindo ao usuário cadastrar, visualizar, editar e excluir transações.
- Destaque que o sistema foi desenvolvido como parte do Tech Challenge do curso de pós-graduação em Front-end Engineering.

### 2. Tela Inicial (Landing Page)

- Mostre a landing page, que é a tela inicial do sistema.
- Explique que, por enquanto, não há tela de login: o acesso é direto à landing page.
- Destaque o painel principal com saldo, extrato das últimas transações e o gráfico do mês atual.
- Explique que o layout é responsivo, adaptando-se a diferentes dispositivos (desktop, tablet, mobile).
- Ressalte o uso do Design System e do Dark Theme para uma experiência moderna e acessível.

### 3. Listagem de Transações

- Navegue até a tela de listagem.
- Mostre como visualizar todas as transações cadastradas.
- Demonstre as opções de editar e excluir transações diretamente na lista.
- Explique que cada transação exibe tipo, valor, data e descrição.

### 4. Cadastro/Edição de Transação

- Demonstre o formulário para adicionar uma nova transação, mostrando os campos obrigatórios e opcionais.
- Mostre a edição de uma transação existente, destacando a validação dos dados e as mensagens de erro em caso de preenchimento incorreto.
- Explique que o sistema atualiza automaticamente o saldo e o extrato após cada operação.

### 5. Páginas em Desenvolvimento

- Apresente a página de configurações, explicando que está em desenvolvimento e que futuramente permitirá ao usuário personalizar preferências do sistema, como tema e notificações.
- Mostre a página "Meus Cartões", também em desenvolvimento, que futuramente permitirá o gerenciamento de cartões vinculados à conta do usuário.

### 6. Documentação e Ajuda

- Mostre rapidamente a documentação dos componentes no Storybook.
- Explique que o usuário pode consultar o manual e a documentação para tirar dúvidas.

### 7. Encerramento

- Reforce os diferenciais: facilidade de uso, design moderno, responsividade, segurança e documentação completa.
- Comente que novas funcionalidades estão em desenvolvimento e convide para acompanhar as atualizações.
- Convide para conhecer a documentação, acessar o repositório e agradecer pela atenção.

---

## Vídeo 2: Explicação Técnica e Estrutura do Código

### 1. Introdução

- Apresente o grupo, o desafio proposto e o contexto do projeto.
- Explique o objetivo do vídeo: mostrar como o sistema foi pensado, estruturado e desenvolvido.

### 2. Arquitetura Geral

- Explique a escolha do Angular como framework principal, destacando sua robustez para aplicações SPA.
- Destaque o uso do Tailwind CSS para estilização rápida e consistente, e do Storybook para documentação e testes visuais dos componentes.
- Comente sobre o backend simulado com JSON Server, facilitando o desenvolvimento e testes locais.
- Explique que o Design System foi criado no Figma e seguido no desenvolvimento.

### 3. Estrutura de Pastas

- Mostre a organização do projeto:
  - `src/app/pages`: páginas principais do sistema (home, painel, transações, configurações).
  - `src/app/shared`: componentes reutilizáveis, modelos, serviços e pipes.
  - `assets`: ícones, imagens e recursos estáticos.
  - `data/db.json`: base de dados simulada para o backend.
- Explique a separação de responsabilidades: componentes para UI, serviços para lógica de negócio e comunicação com backend, modelos para tipagem e pipes para formatação de dados.

### 4. Modelagem e Banco de Dados

- Apresente os modelos conceitual e lógico (usuário, transação) conforme a documentação.
- Explique como as entidades se relacionam: um usuário possui muitas transações, cada transação pertence a um usuário.
- Mostre exemplos de como os dados são persistidos e recuperados do JSON Server.

### 5. Funcionalidades e Fluxos

- Comente sobre os principais fluxos (casos de uso): criar, editar e excluir transações.
- Mostre como cada fluxo está implementado no código:
  - Componentes responsáveis pela interface.
  - Serviços que realizam as operações de CRUD.
  - Rotas que organizam a navegação.
- Explique como a validação de dados e mensagens de erro são tratadas.

### 6. Design System e Responsividade

- Explique a integração com o Figma e como o Design System foi seguido.
- Mostre exemplos de componentes reutilizáveis e a preocupação com acessibilidade e responsividade.
- Destaque o suporte ao Dark Theme.

### 7. Testes e Documentação

- Mostre o uso do Storybook para documentação visual dos componentes.
- Explique a importância dos testes e da documentação para a manutenção e evolução do sistema.

### 8. Considerações Finais

- Destaque os aprendados, desafios superados (ex: integração de ferramentas, responsividade, design system) e próximos passos.
- Agradeça pela atenção e convide para acessar o repositório, a documentação e contribuir com feedbacks.
