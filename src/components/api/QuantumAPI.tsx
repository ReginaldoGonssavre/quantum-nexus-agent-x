
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Code, Play, Copy, Key } from 'lucide-react';

interface APIExample {
  title: string;
  description: string;
  code: string;
  language: string;
}

const apiExamples: APIExample[] = [
  {
    title: 'Executar Circuito Qiskit',
    description: 'Execute um circuito quântico usando a API RAVIAN QUANTUM',
    language: 'python',
    code: `import requests

# Configurar API
api_key = "your_ravian_quantum_api_key"
headers = {"Authorization": f"Bearer {api_key}"}

# Definir circuito
circuit_data = {
    "framework": "qiskit",
    "circuit": {
        "gates": [
            {"type": "H", "qubit": 0},
            {"type": "CNOT", "control": 0, "target": 1}
        ],
        "measurements": [0, 1]
    },
    "shots": 1024
}

# Executar
response = requests.post(
    "https://api.ravianquantum.com/v1/execute",
    json=circuit_data,
    headers=headers
)

result = response.json()
print(f"Resultado: {result['counts']}")
print(f"Análise RAVIAN: {result['agent_analysis']}")`
  },
  {
    title: 'Análise Multi-Framework',
    description: 'Compare resultados entre diferentes frameworks quânticos',
    language: 'javascript',
    code: `const RavianQuantum = require('@ravian/quantum-sdk');

const client = new RavianQuantum({
  apiKey: process.env.RAVIAN_API_KEY
});

async function compareFrameworks() {
  const comparison = await client.multiFramework.compare({
    algorithms: ['vqe', 'qaoa'],
    frameworks: ['qiskit', 'cirq', 'qsharp'],
    problem: {
      type: 'optimization',
      params: { nodes: 8, edges: 12 }
    }
  });
  
  console.log('Comparação RAVIAN QUANTUM:');
  console.log(comparison.analysis);
  console.log('Recomendação:', comparison.recommendation);
}

compareFrameworks();`
  }
];

export const QuantumAPI: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<APIExample>(apiExamples[0]);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const executeExample = async () => {
    setIsLoading(true);
    
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResponse = {
      status: 'success',
      execution_id: 'exec_1234567890',
      framework: 'qiskit',
      results: {
        counts: { '00': 512, '11': 512 },
        execution_time: 1.23,
        quantum_volume: 64
      },
      agent_analysis: {
        entanglement_detected: true,
        optimization_suggestions: [
          'Circuito demonstra emaranhamento perfeito',
          'Recomendado para algoritmos de comunicação quântica'
        ],
        confidence: 0.95
      }
    };
    
    setApiResponse(JSON.stringify(mockResponse, null, 2));
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Key className="h-6 w-6 text-green-400" />
            <span>RAVIAN QUANTUM API</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            Integre o poder do RAVIAN QUANTUM em suas aplicações com nossa API RESTful
          </p>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="bg-green-900/50 text-green-300">
              REST API v1.0
            </Badge>
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-300">
              SDKs Disponíveis
            </Badge>
            <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
              WebSocket Support
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="bg-black/40 border-gray-700/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">Exemplos de Código</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {apiExamples.map((example, index) => (
                  <Button
                    key={index}
                    variant={selectedExample.title === example.title ? "default" : "outline"}
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedExample(example)}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    {example.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-700/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">
                  {selectedExample.title}
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(selectedExample.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-300 text-sm">{selectedExample.description}</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{selectedExample.code}</code>
                </pre>
              </div>
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                onClick={executeExample}
                disabled={isLoading}
              >
                <Play className="h-4 w-4 mr-2" />
                {isLoading ? 'Executando...' : 'Testar API'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-black/40 border-gray-700/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">Resposta da API</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-300">RAVIAN QUANTUM processando...</p>
              </div>
            ) : (
              <Textarea
                value={apiResponse || 'Execute um exemplo para ver a resposta da API'}
                readOnly
                className="min-h-[400px] bg-gray-900 border-gray-700 text-gray-300 font-mono text-sm"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
