Caso de Uso 2 -- **Editar uma Transação**
------------------------------------------

**Título:** Editar transação existente\
**Ator principal:** Usuário autenticado\
**Pré-condição:** O usuário deve estar logado e ser o criador da transação\
**Descrição:** O usuário pode alterar os dados de uma transação já existente.

### Fluxo Principal:

1.  O usuário acessa a lista de transações

2.  Clica no botão "Editar" da transação desejada

3.  O sistema exibe os dados atuais no formulário

4.  O usuário edita os campos (tipo, valor, data ou descrição)

5.  Clica em "Salvar alterações"

6.  O sistema valida e atualiza os dados no banco

7.  O saldo e o extrato são atualizados

### Fluxo Alternativo:

-   Se os dados forem inválidos, o sistema informa os erros e cancela a atualização.