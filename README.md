# Impact Mais - Sistema de Planejamento Financeiro

Sistema profissional de planejamento financeiro desenvolvido para o Impact Mais com dashboard interativo, projeções e análises detalhadas.

## Características

- Dashboard executivo com KPIs em tempo real
- Gráficos interativos (Receita, Lucro, Clientes, Distribuição)
- Três fontes de receita: Planos ONGs, Planos Empresas e Loja
- Projeções financeiras dinâmicas e ajustáveis
- Exportação de dados em CSV
- Design verde e branco do Impact Mais
- Totalmente responsivo

## Tecnologias

- **React 18** - Framework principal
- **Recharts** - Biblioteca de gráficos
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Vite** - Build tool

##  Instalação

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Passos

1. Clone o repositório ou crie uma pasta para o projeto:
```bash
mkdir impact-mais-financial
cd impact-mais-financial
```

2. Crie a estrutura de pastas:
```bash
mkdir -p src
```

3. Copie os arquivos fornecidos para as respectivas pastas:
```
impact-mais-financial/
├── src/
│   ├── App.jsx
│   ├── FinancialPlanner.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

4. Instale as dependências:
```bash
npm install
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse: `http://localhost:3000`

## Estrutura do Projeto

```
src/
├── App.jsx                 # Componente principal
├── FinancialPlanner.jsx    # Dashboard financeiro completo
├── main.jsx                # Entry point React
└── index.css               # Estilos globais + Tailwind
```

## Como Usar

### Ajustando Parâmetros

1. **Período de Projeção**: Define quantos meses serão projetados (1-60 meses)
2. **Taxa de Crescimento**: Configure o crescimento anual para ONGs, Empresas e Loja
3. **Custos**: Defina custos fixos mensais e percentual de custos variáveis
4. **Clientes Iniciais**: Configure quantos clientes você tem em cada plano

### Planos e Preços

**ONGs:**
- Básico: R$ 49,90/mês
- Pro: R$ 69,90/mês
- Premium: R$ 89,90/mês

**Empresas:**
- Básico: R$ 149,90/mês
- Pro: R$ 249,90/mês
- Premium: R$ 399,90/mês

### Exportando Dados

Clique no botão "Exportar Dados" no cabeçalho para baixar todas as projeções em formato CSV.

## Personalizando a Logo

Para adicionar a logo do Impact Mais, edite o arquivo `src/FinancialPlanner.jsx`:

Localize esta seção (linha ~145):
```jsx
<div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
  <span className="text-white font-bold text-2xl">IM</span>
</div>
```

Substitua por:
```jsx
<div className="w-20 h-20 rounded-xl shadow-lg overflow-hidden">
  <img 
    src="/path/to/your/logo.png" 
    alt="Impact Mais Logo" 
    className="w-full h-full object-contain"
  />
</div>
```

## Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## Funcionalidades do Dashboard

### KPIs Principais
- Receita Total com comparativo de crescimento
- Lucro Líquido com margem percentual
- Total de Clientes (ONGs + Empresas)
- Receita da Loja com participação percentual

### Gráficos
1. **Evolução da Receita** - Gráfico de área empilhada
2. **Distribuição de Receita** - Gráfico de pizza
3. **Receita vs Lucro** - Gráfico de linhas
4. **Crescimento de Clientes** - Gráfico de barras

### Análise Estratégica
- Ponto de Break-Even
- Crescimento Total no período
- ROI e Lucro Acumulado

## Suporte

Para dúvidas ou sugestões sobre o sistema financeiro, entre em contato com a equipe de desenvolvimento.

## Licença

Este projeto é proprietário do Impact Mais.

---

**Desenvolvido por equipe Impact Mais**