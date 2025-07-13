
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, CheckCircle } from 'lucide-react';

interface QSharpModuleProps {
  results?: string;
}

const QSharpModule: React.FC<QSharpModuleProps> = ({ results }) => {
  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-800/30 border-green-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-green-400" />
            <span>Q#</span>
          </div>
          <Badge variant="secondary" className="bg-green-700/50 text-green-200">
            Microsoft
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>Interoperabilidade simulada</p>
          <p className="text-xs text-gray-400 mt-1">HelloQuantum operation</p>
        </div>
        
        {results ? (
          <div className="space-y-3">
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-semibold text-green-300">Resultado Q#</span>
              </div>
              <p className="text-sm text-gray-300 font-mono leading-relaxed">
                {results}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-900/20 rounded p-2">
                <div className="text-xs text-gray-400">Status</div>
                <div className="text-sm text-green-300 font-semibold">Success</div>
              </div>
              <div className="bg-green-900/20 rounded p-2">
                <div className="text-xs text-gray-400">Runtime</div>
                <div className="text-sm text-green-300 font-semibold">0.12s</div>
              </div>
              <div className="bg-green-900/20 rounded p-2">
                <div className="text-xs text-gray-400">Qubits</div>
                <div className="text-sm text-green-300 font-semibold">2</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <Code className="h-8 w-8 mx-auto mb-2 animate-pulse" />
            <p className="text-sm">Aguardando execução...</p>
          </div>
        )}
        
        <div className="text-xs text-gray-500 border-t border-green-700/30 pt-2">
          operation HelloQuantum() : Result[]
        </div>
      </CardContent>
    </Card>
  );
};

export default QSharpModule;
