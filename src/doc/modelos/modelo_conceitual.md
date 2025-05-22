# Modelo Conceitual

**Entidades:**

-   **Usuário**

-   **Transação**

**Relacionamentos:**

-   Um usuário **possui muitas transações**

-   Cada transação **pertence a um único usuário**

**Atributos:**

**Usuário**

-   id_usuario (PK)

-   nome

-   email

-   senha

**Transação**

-   id_transacao (PK)

-   tipo (depósito, saque, transferência)

-   valor

-   data

-   descrição

-   id_usuario (FK)