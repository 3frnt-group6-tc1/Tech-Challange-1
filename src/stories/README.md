# Storybook

Este diretório contém as stories do Storybook para documentar e testar os componentes da aplicação.

## Estrutura de Pastas

```
stories/
├── landing/         # Componentes da Landing Page
│ 
├── dashboard/       # Componentes da área logada
│  
└── shared/          # Componentes compartilhados
    ├── buttons/     # Botões
    ├── inputs/      # Campos de entrada
    └── text/        # Componentes de texto
```

## Como Adicionar Novos Componentes

1. **Criar a Story**
   - Crie um arquivo `.stories.ts` na pasta apropriada
   - Nome do arquivo deve seguir o padrão: `[nome-do-componente].stories.ts`

2. **Estrutura Básica**
   ```typescript
   import type { Meta, StoryObj } from '@storybook/angular';
   import { SeuComponente } from '../app/caminho/do/seu-componente';

   const meta: Meta<SeuComponente> = {
     title: 'Categoria/SeuComponente', // Ex: 'Dashboard/Header'
     component: SeuComponente,
     tags: ['autodocs'],
     argTypes: {
       // Defina os controles para cada @Input do seu componente
       propriedade: { control: 'tipo' },
     },
   };

   export default meta;
   type Story = StoryObj<SeuComponente>;

   // Exemplos de uso do componente
   export const Default: Story = {
     args: {
       // Valores padrão para as propriedades
     },
   };
   ```

3. **Controles Disponíveis**
   - `text`: Para strings
   - `boolean`: Para valores booleanos
   - `select`: Para opções predefinidas
   - `object`: Para objetos complexos
   - `number`: Para valores numéricos
   - `date`: Para datas

4. **Boas Práticas**
   - Mantenha as stories organizadas por contexto
   - Use nomes descritivos para as stories
   - Documente casos de uso importantes
   - Inclua exemplos de diferentes estados do componente

## Executando o Storybook

```bash
# Iniciar o Storybook
npm run storybook

# Construir o Storybook
npm run build-storybook
```

## Recursos Adicionais

- [Documentação Oficial do Storybook](https://storybook.js.org/docs/angular/get-started/introduction)
- [Guia de Boas Práticas](https://storybook.js.org/docs/angular/writing-stories/introduction)
- [Addons Recomendados](https://storybook.js.org/addons) 