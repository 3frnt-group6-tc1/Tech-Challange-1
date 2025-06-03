# Sistema de Gestão Financeira

Projeto desenvolvido como parte do **Tech Challenge - Fase 01** do curso pós Front-end Engineering, com foco na aplicação prática de conceitos de desenvolvimento web, design system e boas práticas de programação.

---

## 📝 Descrição

Este projeto consiste no desenvolvimento de uma aplicação web para **gerenciamento financeiro**, permitindo aos usuários visualizar, adicionar, editar e excluir transações financeiras.

## 🎯 Funcionalidades

- ✅ Página inicial com resumo de saldo e extrato das últimas transações.
- ✅ Gráfico do resumo das transações do mês atual
- ✅ Listagem completa de transações, com opções de visualizar, editar e excluir.
- ✅ Formulário para adicionar novas transações (depósito, transferência, etc.).
- ✅ Modal ou página dedicada para edição e exclusão de transações existentes.
- ✅ Layout responsivo em diferentes tamanhos de telas: desktop, tablet e mobile.
- ✅ Interface consistente baseada em Design System.
- ✅ Documentação de componentes com Storybook.
- ✅ Dark Theme

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Angular
- **Estilização:** Tailwind CSS
- **Documentação de Componentes:** Storybook
- **Design System:** Figma ([Visualizar Figma](https://www.figma.com/design/x4g46ODcpZOemqLp0FYOlO/Bytebank?node-id=0-1&p=f))
- **Backend:** JSON Server
- **Base de Dados:** JSON

---

## 📦 Instalação e Execução

### ✅ Pré-requisitos

- Node.js (versão recomendada: LTS)
- npm (gerenciador de pacotes)
- Angular CLI

### ✅ Passos para rodar o projeto:

1. **Clone o repositório:**

```bash
git clone https://github.com/3frnt-group6-tc1/Tech-Challange-1 <folder-name>
cd <folder-name>
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute a API backend:**

```bash
npm run server
```

4. **Execute o projeto em ambiente de desenvolvimento:**

```bash
ng serve
```

5. **Acesse no navegador:**

```bash
http://localhost:4200
```

---

### ✅ Documentação

1. **Execute o storybook:**

```bash
npm run storybook
```

2. **Acesse no navegador:**

```bash
http://localhost:6006
```

### ✅ Observações

## Login e Usuário

- Atualmente, o sistema não possui tela de login nem autenticação de usuários. O acesso é direto à landing page e todas as funcionalidades estão disponíveis sem restrição de acesso.
- Para alterar o usuário ativo no sistema, é necessário modificar manualmente o valor da propriedade `userId` no arquivo `src/app/app.config.ts`. Basta substituir o valor atual pelo identificador desejado (por exemplo, 'u1', 'u2', etc.).
- Futuramente, funcionalidades de autenticação e gerenciamento de usuários poderão ser implementadas para maior segurança e personalização.

---

## 🧑‍💻 Equipe de Desenvolvimento

Este projeto foi desenvolvido em grupo por:

<table>
  <tr>
    <td align="center"><b>Matheus Althman Hespagnola</b></td>
    <td align="center"><b>João Víctor Zinatto Sobral</b></td>
    <td align="center"><b>Vinícius Batista Rocha Santos</b></td>
    <td align="center"><b>Christian Fernando Borges Pereira</b></td>
    <td align="center"><b>Danyllo Valente da Silva</b></td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Mat-hespa">
        <img src="https://github.com/Mat-hespa.png" width="60" height="60" style="border-radius:50%"><br/>
        Mat-hespa
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/joohzinato">
        <img src="https://github.com/joohzinato.png" width="60" height="60" style="border-radius:50%"><br/>
        joohzinato
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/AJK-Vinicius">
        <img src="https://github.com/AJK-Vinicius.png" width="60" height="60" style="border-radius:50%"><br/>
        AJK-Vinicius
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Christian-Fernando993">
        <img src="https://github.com/Christian-Fernando993.png" width="60" height="60" style="border-radius:50%"><br/>
        Christian-Fernando993
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dvsilva">
        <img src="https://github.com/dvsilva.png" width="60" height="60" style="border-radius:50%"><br/>
        dvsilva
      </a>
    </td>
  </tr>
</table>

---
