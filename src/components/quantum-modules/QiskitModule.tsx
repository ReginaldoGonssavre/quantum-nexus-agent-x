
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Zap, Activity } from 'lucide-react';

interface QiskitModuleProps {
  results?: { [key: string]: number };
}

const QiskitModule: React.FC<QiskitModuleProps> = ({ results }) => {
  const chartData = results ? Object.entries(results).map(([state, count]) => ({
    state,
    count
  })) : [];

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-800/30 border-purple-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-400" />
            <span>Qiskit</span>
          </div>
          <Badge variant="secondary" className="bg-purple-700/50 text-purple-200">
            IBM
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>Circuito de emaranhamento</p>
          <p className="text-xs text-gray-400 mt-1">Bell state preparation</p>
        </div>
        
        {results ? (
          <div className="space-y-3">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis 
                    dataKey="state" 
                    tick={{ fill: '#e5e7eb', fontSize: 10 }} 
                    axisLine={{ stroke: '#a855f7' }}
                  />
                  <YAxis 
                    tick={{ fill: '#e5e7eb', fontSize: 10 }}
                    axisLine={{ stroke: '#a855f7' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#a855f7" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              {Object.entries(results).map(([state, count]) => (
                <div key={state} className="bg-purple-900/20 rounded p-2">
                  <div className="text-xs text-gray-400">|{state}⟩</div>
                  <div className="text-sm text-purple-300 font-semibold">{count}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <Activity className="h-8 w-8 mx-auto mb-2 animate-pulse" />
            <p className="text-sm">Aguardando execução...</p>
          </div>
        )}
        
        <div className="text-xs text-gray-500 border-t border-purple-700/30 pt-2">
          H(0) → CNOT(0,1) → Measure
        </div>
      </CardContent>
    </Card>
  );
};

export default QiskitModule;
