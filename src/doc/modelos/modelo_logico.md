**Usuário**

| Campo       | Tipo     | Chave | Descrição                      |
|-------------|----------|-------|--------------------------------|
| id_usuario  | INTEGER  | PK    | Identificador único do usuário |
| nome        | VARCHAR  |       | Nome completo do usuário       |
| email       | VARCHAR  |       | E-mail do usuário              |
| senha       | VARCHAR  |       | Senha criptografada do usuário |

**Trasação**
| Campo         | Tipo     | Chave | Descrição                                |
|---------------|----------|-------|------------------------------------------|
| id_transacao  | INTEGER  | PK    | Identificador único da transação         |
| tipo          | VARCHAR  |       | Tipo de transação (depósito, saque, etc) |
| valor         | DECIMAL  |       | Valor financeiro da transação            |
| data          | DATE     |       | Data em que a transação ocorreu          |
| descricao     | VARCHAR  |       | Texto opcional com detalhes              |
| id_usuario    | INTEGER  | FK    | Relacionamento com o usuário (FK)        |
