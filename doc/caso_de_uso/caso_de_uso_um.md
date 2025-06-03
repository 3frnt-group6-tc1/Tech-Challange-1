Caso de Uso 1 -- **Criar Nova Transação**
----------------------------------------

**Título:** Criar uma nova transação\
**Ator principal:** Usuário autenticado\
**Pré-condição:** O usuário deve estar logado no sistema\
**Descrição:** O usuário preenche os dados de uma nova transação e salva no sistema.

### Fluxo Principal:

1.  O usuário acessa a tela de "Nova Transação"

2.  O sistema exibe um formulário com campos:

    -   Tipo de transação (depósito, saque, transferência)

    -   Valor

    -   Data

    -   Descrição (opcional)

3.  O usuário preenche os campos e clica em "Criar Transação"

4.  O sistema valida os dados

5.  O sistema salva a transação associando ao ID do usuário

6.  O saldo e o extrato são atualizados

### Fluxo Alternativo:

-   Se os dados forem inválidos, o sistema exibe mensagens de erro e não realiza o salvamento.