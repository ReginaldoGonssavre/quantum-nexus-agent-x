
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap, Brain, Award } from 'lucide-react';

interface Benchmark {
  id: string;
  name: string;
  description: string;
  category: 'algorithm' | 'performance' | 'accuracy' | 'innovation';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  points: number;
  worldRecord?: {
    holder: string;
    score: number;
    date: string;
  };
  userBest?: number;
}

const benchmarks: Benchmark[] = [
  {
    id: 'quantum-supremacy',
    name: 'Supremacia Quântica',
    description: 'Demonstre superioridade quântica em problema específico',
    category: 'performance',
    difficulty: 'expert',
    points: 1000,
    worldRecord: {
      holder: 'Google Quantum AI',
      score: 200,
      date: '2023-10-15'
    }
  },
  {
    id: 'error-correction',
    name: 'Correção de Erros Quânticos',
    description: 'Implemente correção de erros com eficiência > 99%',
    category: 'accuracy',
    difficulty: 'hard',
    points: 500,
    worldRecord: {
      holder: 'IBM Quantum',
      score: 99.2,
      date: '2023-09-20'
    }
  },
  {
    id: 'hybrid-algorithm',
    name: 'Algoritmo Híbrido VQE',
    description: 'Otimize VQE para moléculas complexas',
    category: 'algorithm',
    difficulty: 'medium',
    points: 250
  }
];

export const BenchmarkSystem: React.FC = () => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<Benchmark | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runBenchmark = async (benchmark: Benchmark) => {
    setSelectedBenchmark(benchmark);
    setIsRunning(true);
    setProgress(0);

    // Simular execução do benchmark
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsRunning(false);
    // Simular resultado
    const score = Math.random() * 100;
    alert(`Benchmark concluído! Score: ${score.toFixed(2)}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'hard': return 'bg-orange-600';
      case 'expert': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'algorithm': return <Brain className="h-4 w-4" />;
      case 'performance': return <Zap className="h-4 w-4" />;
      case 'accuracy': return <Target className="h-4 w-4" />;
      case 'innovation': return <Award className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span>Benchmarks Científicos RAVIAN QUANTUM</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            Desafie os limites da computação quântica e compete com pesquisadores do mundo todo
          </p>
          
          {isRunning && selectedBenchmark && (
            <div className="mb-6 p-4 bg-purple-900/20 rounded-lg border border-purple-700/30">
              <div className="text-white font-semibold mb-2">
                Executando: {selectedBenchmark.name}
              </div>
              <Progress value={progress} className="mb-2" />
              <div className="text-sm text-gray-400">
                RAVIAN QUANTUM processando... {progress}%
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benchmarks.map((benchmark) => (
          <Card key={benchmark.id} className="bg-black/40 border-gray-700/30 hover:border-purple-500/50 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${getDifficultyColor(benchmark.difficulty)} text-white text-xs`}>
                  {benchmark.difficulty.toUpperCase()}
                </Badge>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">{benchmark.points}pts</span>
                </div>
              </div>
              
              <CardTitle className="text-white text-lg flex items-center space-x-2">
                {getCategoryIcon(benchmark.category)}
                <span>{benchmark.name}</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                {benchmark.description}
              </p>
              
              {benchmark.worldRecord && (
                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-700/30">
                  <div className="text-yellow-300 font-semibold text-sm mb-1">
                    Recorde Mundial
                  </div>
                  <div className="text-xs text-gray-300">
                    {benchmark.worldRecord.holder}: {benchmark.worldRecord.score}
                  </div>
                  <div className="text-xs text-gray-400">
                    {benchmark.worldRecord.date}
                  </div>
                </div>
              )}
              
              <Button 
                onClick={() => runBenchmark(benchmark)}
                disabled={isRunning}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isRunning && selectedBenchmark?.id === benchmark.id 
                  ? 'Executando...' 
                  : 'Executar Benchmark'
                }
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
