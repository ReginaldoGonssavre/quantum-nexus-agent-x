
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal, FileCode } from 'lucide-react';

interface QuipperModuleProps {
  results?: string;
}

const QuipperModule: React.FC<QuipperModuleProps> = ({ results }) => {
  return (
    <Card className="bg-gradient-to-br from-yellow-900/30 to-amber-800/30 border-yellow-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5 text-yellow-400" />
            <span>Quipper</span>
          </div>
          <Badge variant="secondary" className="bg-yellow-700/50 text-yellow-200">
            Haskell
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>Simulação conceitual funcional</p>
          <p className="text-xs text-gray-400 mt-1">Teleportation circuit</p>
        </div>
        
        {results ? (
          <div className="space-y-3">
            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700/30">
              <div className="flex items-center space-x-2 mb-2">
                <FileCode className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-300">Código Quipper</span>
              </div>
              <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
                {results}
              </pre>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-yellow-900/20 rounded p-3 text-center">
                <div className="text-xs text-gray-400">Language</div>
                <div className="text-sm text-yellow-300 font-semibold">Haskell</div>
              </div>
              <div className="bg-yellow-900/20 rounded p-3 text-center">
                <div className="text-xs text-gray-400">Paradigm</div>
                <div className="text-sm text-yellow-300 font-semibold">Functional</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <Terminal className="h-8 w-8 mx-auto mb-2 animate-pulse" />
            <p className="text-sm">Aguardando execução...</p>
          </div>
        )}
        
        <div className="text-xs text-gray-500 border-t border-yellow-700/30 pt-2">
          import Quipper → teleportation circuit
        </div>
      </CardContent>
    </Card>
  );
};

export default QuipperModule;
