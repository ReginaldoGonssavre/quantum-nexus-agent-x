
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Eye, Waves } from 'lucide-react';

interface StrawberryFieldsModuleProps {
  results?: number[];
}

const StrawberryFieldsModule: React.FC<StrawberryFieldsModuleProps> = ({ results }) => {
  const chartData = results ? results.map((value, index) => ({
    measurement: index + 1,
    photons: value
  })) : [];

  return (
    <Card className="bg-gradient-to-br from-pink-900/30 to-rose-800/30 border-pink-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-pink-400" />
            <span>Strawberry Fields</span>
          </div>
          <Badge variant="secondary" className="bg-pink-700/50 text-pink-200">
            Fotônica
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          <p>Computação contínua fotônica</p>
          <p className="text-xs text-gray-400 mt-1">Sgate + BSgate + MeasureFock</p>
        </div>
        
        {results ? (
          <div className="space-y-3">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="measurement" 
                    tick={{ fill: '#e5e7eb', fontSize: 10 }} 
                    axisLine={{ stroke: '#ec4899' }}
                  />
                  <YAxis 
                    tick={{ fill: '#e5e7eb', fontSize: 10 }}
                    axisLine={{ stroke: '#ec4899' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="photons" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-xs text-gray-400">Amostras Fotônicas</div>
                <div className="text-sm text-pink-300 font-mono">
                  [{results.join(', ')}]
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-pink-900/20 rounded p-2">
                <div className="text-xs text-gray-400">Cutoff</div>
                <div className="text-sm text-pink-300 font-semibold">5</div>
              </div>
              <div className="bg-pink-900/20 rounded p-2">
                <div className="text-xs text-gray-400">Backend</div>
                <div className="text-sm text-pink-300 font-semibold">Fock</div>
              </div>
              <div className="bg-pink-900/20 rounded p-2">
                <div className="text-xs text-gray-400">Medições</div>
                <div className="text-sm text-pink-300 font-semibold">{results.length}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <Waves className="h-8 w-8 mx-auto mb-2 animate-pulse" />
            <p className="text-sm">Aguardando execução...</p>
          </div>
        )}
        
        <div className="text-xs text-gray-500 border-t border-pink-700/30 pt-2">
          Sgate(0.43) | q[0] → BSgate(0.5)
        </div>
      </CardContent>
    </Card>
  );
};

export default StrawberryFieldsModule;
