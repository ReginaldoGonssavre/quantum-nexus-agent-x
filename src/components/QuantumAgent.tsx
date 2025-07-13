
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

interface QuantumAgentProps {
  results: any;
  isActive: boolean;
}

interface AgentDecision {
  type: 'optimization' | 'analysis' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence: number;
  framework: string;
}

const QuantumAgent: React.FC<QuantumAgentProps> = ({ results, isActive }) => {
  const [decisions, setDecisions] = useState<AgentDecision[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (results && isActive) {
      analyzeResults();
    }
  }, [results, isActive]);

  const analyzeResults = async () => {
    setIsThinking(true);
    
    // Simular processamento da IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const agentDecisions: AgentDecision[] = [];

    // Análise Qiskit
    if (results.qiskit) {
      const totalShots = Object.values(results.qiskit).reduce((a: number, b: number) => a + b, 0);
      const entanglement = Math.abs(results.qiskit['00'] - results.qiskit['11']) / totalShots;
      
      if (entanglement < 0.1) {
        agentDecisions.push({
          type: 'analysis',
          title: 'Emaranhamento Perfeito Detectado',
          description: 'O sistema Qiskit demonstrou emaranhamento quântico ideal com distribuição uniforme entre estados |00⟩ e |11⟩.',
          confidence: 0.95,
          framework: 'Qiskit'
        });
      }
    }

    // Análise Cirq
    if (results.cirq) {
      const maxState = Math.max(...Object.values(results.cirq));
      const dominantState = Object.entries(results.cirq).find(([_, count]) => count === maxState)?.[0];
      
      agentDecisions.push({
        type: 'optimization',
        title: 'Otimização de Circuito Identificada',
        description: `Cirq otimizou o circuito com estado dominante ${dominantState}. Recomendo usar esta configuração para próximas execuções.`,
        confidence: 0.87,
        framework: 'Cirq'
      });
    }

    // Análise Strawberry Fields
    if (results.strawberryFields) {
      const variance = calculateVariance(results.strawberryFields);
      
      if (variance > 1) {
        agentDecisions.push({
          type: 'alert',
          title: 'Alta Variabilidade Fotônica',
          description: 'Detectada alta variância nas medições fotônicas. Considerar ajuste dos parâmetros de squeeze.',
          confidence: 0.78,
          framework: 'Strawberry Fields'
        });
      }
    }

    // Decisão integrativa
    agentDecisions.push({
      type: 'recommendation',
      title: 'Fusão Quântica Recomendada',
      description: 'Baseado na análise multi-framework, recomendo combinar a estabilidade do Qiskit com a otimização do Cirq para máxima eficiência.',
      confidence: 0.92,
      framework: 'Multi-Framework'
    });

    setDecisions(agentDecisions);
    setIsThinking(false);
  };

  const calculateVariance = (data: number[]): number => {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    return variance;
  };

  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="h-4 w-4" />;
      case 'analysis': return <Brain className="h-4 w-4" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getDecisionColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'text-blue-400';
      case 'analysis': return 'text-purple-400';
      case 'recommendation': return 'text-green-400';
      case 'alert': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  if (!isActive) return null;

  return (
    <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Brain className="h-6 w-6 text-indigo-400 animate-pulse" />
          <span>IA Agêntica - Análise Integrada</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isThinking ? (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto text-indigo-400 animate-spin mb-4" />
            <p className="text-indigo-300">Analisando resultados multi-framework...</p>
            <p className="text-sm text-gray-400 mt-2">Processamento quântico inteligente em andamento</p>
          </div>
        ) : (
          <div className="space-y-3">
            {decisions.map((decision, index) => (
              <div 
                key={index}
                className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-700/30 transition-all duration-300 hover:border-indigo-500/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={getDecisionColor(decision.type)}>
                      {getDecisionIcon(decision.type)}
                    </span>
                    <h4 className="text-sm font-semibold text-white">{decision.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-indigo-700/50 text-indigo-200 text-xs">
                      {decision.framework}
                    </Badge>
                    <div className="text-xs text-gray-400">
                      {Math.round(decision.confidence * 100)}% conf.
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {decision.description}
                </p>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg border border-purple-700/30">
              <div className="text-center">
                <div className="text-sm font-semibold text-purple-300 mb-1">
                  Status da IA Agêntica
                </div>
                <div className="text-xs text-gray-400">
                  Sistema adaptativo ativo • Aprendizado contínuo • Decisões autônomas
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuantumAgent;
