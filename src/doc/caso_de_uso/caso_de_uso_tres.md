Caso de Uso 3 -- **Excluir uma Transação**
-------------------------------------------

**Título:** Excluir transação\
**Ator principal:** Usuário autenticado\
**Pré-condição:** O usuário deve estar logado e ser o criador da transação\
**Descrição:** O usuário pode excluir uma transação que ele mesmo criou.

### Fluxo Principal:

1.  O usuário acessa a lista de transações

2.  Clica no ícone ou botão "Excluir" da transação

3.  O sistema exibe uma confirmação: "Tem certeza que deseja excluir?"

4.  O usuário confirma

5.  O sistema remove a transação do banco

6.  O saldo e o extrato são atualizados

### Fluxo Alternativo:

-   Se o usuário cancelar a exclusão, nenhuma ação é feita.