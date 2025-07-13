
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, Brain, Eye, Terminal } from 'lucide-react';

interface ExecutionVisualizationProps {
  isExecuting: boolean;
  results?: any;
}

const ExecutionVisualization: React.FC<ExecutionVisualizationProps> = ({ isExecuting, results }) => {
  const frameworks = [
    { name: 'Qiskit', icon: Activity, color: 'text-purple-400', bgColor: 'bg-purple-900/20' },
    { name: 'Cirq', icon: Zap, color: 'text-blue-400', bgColor: 'bg-blue-900/20' },
    { name: 'Q#', icon: Brain, color: 'text-green-400', bgColor: 'bg-green-900/20' },
    { name: 'Quipper', icon: Terminal, color: 'text-yellow-400', bgColor: 'bg-yellow-900/20' },
    { name: 'Strawberry Fields', icon: Eye, color: 'text-pink-400', bgColor: 'bg-pink-900/20' },
  ];

  return (
    <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-center">
          {isExecuting ? 'RAVIAN QUANTUM Executando...' : 'Execução Concluída - RAVIAN QUANTUM'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {frameworks.map((framework, index) => {
            const Icon = framework.icon;
            const isActive = isExecuting;
            const hasResults = results && Object.keys(results).length > 0;
            
            return (
              <div 
                key={framework.name}
                className={`${framework.bgColor} rounded-lg p-4 border border-gray-700/30 transition-all duration-300 ${
                  isActive ? 'animate-pulse' : hasResults ? 'border-cyan-400/50' : ''
                }`}
              >
                <div className="text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${framework.color} ${
                    isActive ? 'animate-spin' : ''
                  }`} />
                  <div className="text-xs text-gray-300 font-medium">
                    {framework.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isActive ? 'Processando...' : hasResults ? 'Concluído' : 'Aguardando'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {results && (
          <div className="mt-4 text-center">
            <div className="text-sm text-cyan-300 font-semibold">
              RAVIAN QUANTUM - Análise Multi-Framework Concluída
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Resultados disponíveis para análise agêntica
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExecutionVisualization;
