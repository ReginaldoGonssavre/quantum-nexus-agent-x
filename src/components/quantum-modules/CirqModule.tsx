
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target, Cpu } from 'lucide-react';

interface CirqModuleProps {
  results?: { [key: string]: number };
}

const CirqModule: React.FC<CirqModuleProps> = ({ results }) => {
  const chartData = results ? Object.entries(results).map(([state, count]) => ({
    name: `State ${state}`,
    value: count
  })) : [];

  const COLORS = ['#3b82f6', '#06b6d4', '#0891b2', '#0e7490'];

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-800/30 border-blue-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-400" />
            <span>Cirq</span>
          </div>
          <Badge variant="secondary" className="bg-blue-700/50 text-blue-200">
            Google
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>Otimização de circuito</p>
          <p className="text-xs text-gray-400 mt-1">H + CNOT measurement</p>
        </div>
        
        {results ? (
          <div className="space-y-3">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-4 gap-1 text-center">
              {Object.entries(results).map(([state, count], index) => (
                <div key={state} className="bg-blue-900/20 rounded p-2">
                  <div className="text-xs text-gray-400">S{state}</div>
                  <div className="text-sm text-blue-300 font-semibold">{count}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <Cpu className="h-8 w-8 mx-auto mb-2 animate-pulse" />
            <p className="text-sm">Aguardando execução...</p>
          </div>
        )}
        
        <div className="text-xs text-gray-500 border-t border-blue-700/30 pt-2">
          cirq.H(q0) → cirq.CNOT(q0, q1)
        </div>
      </CardContent>
    </Card>
  );
};

export default CirqModule;
