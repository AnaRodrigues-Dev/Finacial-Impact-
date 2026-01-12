import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign, Users, ShoppingCart, Download, Calculator } from 'lucide-react';

const FinancialPlanner = () => {
  const [projectionPeriod, setProjectionPeriod] = useState(12);
  const [ongsGrowthRate, setOngsGrowthRate] = useState(15);
  const [empresasGrowthRate, setEmpresasGrowthRate] = useState(20);
  const [lojaGrowthRate, setLojaGrowthRate] = useState(10);
  
  const [initialOngs, setInitialOngs] = useState({ basic: 10, pro: 5, premium: 2 });
  const [initialEmpresas, setInitialEmpresas] = useState({ basic: 15, pro: 8, premium: 3 });
  const [initialLojaRevenue, setInitialLojaRevenue] = useState(5000);
  
  const [fixedCosts, setFixedCosts] = useState(15000);
  const [variableCostPercent, setVariableCostPercent] = useState(25);

  const prices = {
    ongs: { basic: 49.90, pro: 69.90, premium: 89.90 },
    empresas: { basic: 149.90, pro: 249.90, premium: 399.90 }
  };

  const financialData = useMemo(() => {
    const months = [];
    
    for (let i = 0; i < projectionPeriod; i++) {
      const monthGrowth = i / 12;
      
      const ongsClients = {
        basic: Math.round(initialOngs.basic * Math.pow(1 + ongsGrowthRate/100, monthGrowth)),
        pro: Math.round(initialOngs.pro * Math.pow(1 + ongsGrowthRate/100, monthGrowth)),
        premium: Math.round(initialOngs.premium * Math.pow(1 + ongsGrowthRate/100, monthGrowth))
      };
      
      const empresasClients = {
        basic: Math.round(initialEmpresas.basic * Math.pow(1 + empresasGrowthRate/100, monthGrowth)),
        pro: Math.round(initialEmpresas.pro * Math.pow(1 + empresasGrowthRate/100, monthGrowth)),
        premium: Math.round(initialEmpresas.premium * Math.pow(1 + empresasGrowthRate/100, monthGrowth))
      };
      
      const ongsRevenue = 
        ongsClients.basic * prices.ongs.basic +
        ongsClients.pro * prices.ongs.pro +
        ongsClients.premium * prices.ongs.premium;
      
      const empresasRevenue = 
        empresasClients.basic * prices.empresas.basic +
        empresasClients.pro * prices.empresas.pro +
        empresasClients.premium * prices.empresas.premium;
      
      const lojaRevenue = initialLojaRevenue * Math.pow(1 + lojaGrowthRate/100, monthGrowth);
      
      const totalRevenue = ongsRevenue + empresasRevenue + lojaRevenue;
      
      const variableCosts = totalRevenue * (variableCostPercent / 100);
      const totalCosts = fixedCosts + variableCosts;
      
      const profit = totalRevenue - totalCosts;
      const profitMargin = (profit / totalRevenue) * 100;
      
      months.push({
        month: `Mês ${i + 1}`,
        monthIndex: i + 1,
        ongsRevenue: Math.round(ongsRevenue),
        empresasRevenue: Math.round(empresasRevenue),
        lojaRevenue: Math.round(lojaRevenue),
        totalRevenue: Math.round(totalRevenue),
        fixedCosts,
        variableCosts: Math.round(variableCosts),
        totalCosts: Math.round(totalCosts),
        profit: Math.round(profit),
        profitMargin: profitMargin.toFixed(1),
        ongsClients: ongsClients.basic + ongsClients.pro + ongsClients.premium,
        empresasClients: empresasClients.basic + empresasClients.pro + empresasClients.premium,
        totalClients: ongsClients.basic + ongsClients.pro + ongsClients.premium + 
                      empresasClients.basic + empresasClients.pro + empresasClients.premium
      });
    }
    
    return months;
  }, [projectionPeriod, ongsGrowthRate, empresasGrowthRate, lojaGrowthRate, 
      initialOngs, initialEmpresas, initialLojaRevenue, fixedCosts, variableCostPercent]);

  const lastMonth = financialData[financialData.length - 1];
  const firstMonth = financialData[0];
  
  const revenueDistribution = [
    { name: 'Planos ONGs', value: lastMonth.ongsRevenue, color: '#10b981' },
    { name: 'Planos Empresas', value: lastMonth.empresasRevenue, color: '#059669' },
    { name: 'Loja', value: lastMonth.lojaRevenue, color: '#047857' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const exportToCSV = () => {
    const headers = ['Mês', 'Receita ONGs', 'Receita Empresas', 'Receita Loja', 'Receita Total', 
                     'Custos Fixos', 'Custos Variáveis', 'Custos Totais', 'Lucro', 'Margem (%)'];
    
    const rows = financialData.map(m => [
      m.month,
      m.ongsRevenue,
      m.empresasRevenue,
      m.lojaRevenue,
      m.totalRevenue,
      m.fixedCosts,
      m.variableCosts,
      m.totalCosts,
      m.profit,
      m.profitMargin
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'impact-mais-projecao-financeira.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-600">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">IM</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Impact Mais</h1>
                <p className="text-xl text-green-600 font-semibold">Planejamento Financeiro Estratégico</p>
              </div>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
              aria-label="Exportar dados financeiros"
            >
              <Download size={20} />
              Exportar Dados
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        <section aria-label="Indicadores principais">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Receita Total</span>
              <DollarSign className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(lastMonth.totalRevenue)}</p>
            <p className="text-sm text-green-600 mt-2">
              +{((lastMonth.totalRevenue / firstMonth.totalRevenue - 1) * 100).toFixed(1)}% vs início
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Lucro Líquido</span>
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(lastMonth.profit)}</p>
            <p className="text-sm text-emerald-600 mt-2">
              Margem: {lastMonth.profitMargin}%
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Total Clientes</span>
              <Users className="text-teal-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800">{lastMonth.totalClients}</p>
            <p className="text-sm text-teal-600 mt-2">
              ONGs: {lastMonth.ongsClients} | Empresas: {lastMonth.empresasClients}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Receita Loja</span>
              <ShoppingCart className="text-green-700" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(lastMonth.lojaRevenue)}</p>
            <p className="text-sm text-green-700 mt-2">
              {((lastMonth.lojaRevenue / lastMonth.totalRevenue) * 100).toFixed(1)}% da receita total
            </p>
          </div>
          </div>
        </section>

        <section aria-label="Parâmetros de projeção">
          <article className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Parâmetros de Projeção</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Período de Projeção (meses)
              </label>
              <input
                type="number"
                value={projectionPeriod}
                onChange={(e) => setProjectionPeriod(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                min="1"
                max="60"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Crescimento ONGs (% ao ano)
              </label>
              <input
                type="number"
                value={ongsGrowthRate}
                onChange={(e) => setOngsGrowthRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Crescimento Empresas (% ao ano)
              </label>
              <input
                type="number"
                value={empresasGrowthRate}
                onChange={(e) => setEmpresasGrowthRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Crescimento Loja (% ao ano)
              </label>
              <input
                type="number"
                value={lojaGrowthRate}
                onChange={(e) => setLojaGrowthRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Custos Fixos Mensais (R$)
              </label>
              <input
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                step="100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Custos Variáveis (% receita)
              </label>
              <input
                type="number"
                value={variableCostPercent}
                onChange={(e) => setVariableCostPercent(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                step="0.1"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Clientes Iniciais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Planos ONGs</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Básico (R$ 49,90)</span>
                    <input
                      type="number"
                      value={initialOngs.basic}
                      onChange={(e) => setInitialOngs({...initialOngs, basic: parseInt(e.target.value) || 0})}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      min="0"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Pro (R$ 69,90)</span>
                    <input
                      type="number"
                      value={initialOngs.pro}
                      onChange={(e) => setInitialOngs({...initialOngs, pro: parseInt(e.target.value) || 0})}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      min="0"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Premium (R$ 89,90)</span>
                    <input
                      type="number"
                      value={initialOngs.premium}
                      onChange={(e) => setInitialOngs({...initialOngs, premium: parseInt(e.target.value) || 0})}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-800 mb-3">Planos Empresas</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Básico (R$ 149,90)</span>
                    <input
                      type="number"
                      value={initialEmpresas.basic}
                      onChange={(e) => setInitialEmpresas({...initialEmpresas, basic: parseInt(e.target.value) || 0})}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      min="0"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Pro (R$ 249,90)</span>
                    <input
                      type="number"
                      value={initialEmpresas.pro}
                      onChange={(e) => setInitialEmpresas({...initialEmpresas, pro: parseInt(e.target.value) || 0})}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      min="0"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Premium (R$ 399,90)</span>
                    <input
                      type="number"
                      value={initialEmpresas.premium}
                      onChange={(e) => setInitialEmpresas({...initialEmpresas, premium: parseInt(e.target.value) || 0})}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Receita Inicial da Loja (R$/mês)
              </label>
              <input
                type="number"
                value={initialLojaRevenue}
                onChange={(e) => setInitialLojaRevenue(parseFloat(e.target.value) || 0)}
                className="w-full md:w-64 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                step="100"
              />
            </div>
          </div>
            </article>
        </section>

        <section aria-label="Gráficos de análise">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Evolução da Receita</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area type="monotone" dataKey="ongsRevenue" stackId="1" stroke="#10b981" fill="#10b981" name="ONGs" />
                <Area type="monotone" dataKey="empresasRevenue" stackId="1" stroke="#059669" fill="#059669" name="Empresas" />
                <Area type="monotone" dataKey="lojaRevenue" stackId="1" stroke="#047857" fill="#047857" name="Loja" />
              </AreaChart>
            </ResponsiveContainer>
            </article>

            <article className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Distribuição de Receita (Último Mês)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            </article>

            <article className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Receita vs Lucro</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="totalRevenue" stroke="#10b981" strokeWidth={2} name="Receita Total" />
                <Line type="monotone" dataKey="profit" stroke="#059669" strokeWidth={2} name="Lucro Líquido" />
              </LineChart>
            </ResponsiveContainer>
            </article>

            <article className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Crescimento de Clientes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ongsClients" fill="#10b981" name="ONGs" />
                <Bar dataKey="empresasClients" fill="#059669" name="Empresas" />
              </BarChart>
            </ResponsiveContainer>
            </article>
          </div>
        </section>

        <section aria-label="Projeção detalhada">
          <article className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Projeção Detalhada por Mês</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left rounded-tl-lg">Mês</th>
                  <th className="px-4 py-3 text-right">Receita ONGs</th>
                  <th className="px-4 py-3 text-right">Receita Empresas</th>
                  <th className="px-4 py-3 text-right">Receita Loja</th>
                  <th className="px-4 py-3 text-right">Receita Total</th>
                  <th className="px-4 py-3 text-right">Custos</th>
                  <th className="px-4 py-3 text-right">Lucro</th>
                  <th className="px-4 py-3 text-right rounded-tr-lg">Margem %</th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((month, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{month.month}</td>
                    <td className="px-4 py-3 text-right text-green-600">{formatCurrency(month.ongsRevenue)}</td>
                    <td className="px-4 py-3 text-right text-green-600">{formatCurrency(month.empresasRevenue)}</td>
                    <td className="px-4 py-3 text-right text-green-600">{formatCurrency(month.lojaRevenue)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">{formatCurrency(month.totalRevenue)}</td>
                    <td className="px-4 py-3 text-right text-red-600">{formatCurrency(month.totalCosts)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-600">{formatCurrency(month.profit)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">{month.profitMargin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section aria-label="Análise estratégica">
        <article className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Análise Estratégica</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Break-Even</h4>
              <p className="text-green-50">
                {financialData.find(m => m.profit > 0) 
                  ? `Ponto de equilíbrio atingido no ${financialData.find(m => m.profit > 0).month}`
                  : 'Ajuste os parâmetros para atingir lucratividade'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Crescimento Total</h4>
              <p className="text-green-50">
                {((lastMonth.totalRevenue / firstMonth.totalRevenue - 1) * 100).toFixed(1)}% 
                de crescimento em {projectionPeriod} meses
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">ROI Projetado</h4>
              <p className="text-green-50">
                Lucro acumulado: {formatCurrency(financialData.reduce((acc, m) => acc + m.profit, 0))}
              </p>
            </div>
          </div>
          </article>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto mt-8 text-center text-gray-600">
        <p className="text-sm">
          Impact Mais - Planejamento Financeiro Profissional | Desenvolvido para análise estratégica de negócios
        </p>
      </footer>
    </div>
  );
};

export default FinancialPlanner;