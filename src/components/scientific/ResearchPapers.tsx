
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ExternalLink, Star } from 'lucide-react';

interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  category: string;
  impact: number;
  citations: number;
  downloadUrl: string;
  publishedDate: string;
}

const papers: ResearchPaper[] = [
  {
    id: 'ravian-quantum-architecture',
    title: 'RAVIAN QUANTUM: A Multi-Framework Quantum Computing Architecture',
    authors: ['Dr. Quantum Research Team'],
    abstract: 'Apresentamos RAVIAN QUANTUM, uma arquitetura revolucionária que unifica cinco linguagens de computação quântica em um sistema agêntico autônomo...',
    category: 'Quantum Computing',
    impact: 9.2,
    citations: 0,
    downloadUrl: '#',
    publishedDate: '2024-01-15'
  },
  {
    id: 'quantum-supremacy-benchmarks',
    title: 'Redefining Quantum Supremacy: New Benchmarks for the Post-Classical Era',
    authors: ['RAVIAN Quantum Consortium'],
    abstract: 'Este trabalho propõe novos benchmarks para avaliar supremacia quântica além dos critérios tradicionais, incluindo métricas de eficiência energética...',
    category: 'Quantum Algorithms',
    impact: 8.7,
    citations: 12,
    downloadUrl: '#',
    publishedDate: '2024-02-28'
  }
];

export const ResearchPapers: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <FileText className="h-6 w-6 text-cyan-400" />
            <span>Publicações Científicas RAVIAN QUANTUM</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            Acesse nossa coleção de papers revolucionários que estão redefinindo a computação quântica
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {papers.map((paper) => (
          <Card key={paper.id} className="bg-black/40 border-gray-700/30 hover:border-cyan-500/50 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-300">
                  {paper.category}
                </Badge>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">{paper.impact}</span>
                  </div>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">
                    {paper.citations} citações
                  </Badge>
                </div>
              </div>
              
              <CardTitle className="text-white text-lg leading-tight">
                {paper.title}
              </CardTitle>
              
              <div className="text-sm text-gray-400">
                {paper.authors.join(', ')} • {paper.publishedDate}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                {paper.abstract}
              </p>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Submeta Seu Paper
          </h3>
          <p className="text-gray-300 mb-4">
            Publique suas descobertas com RAVIAN QUANTUM e impacte a comunidade científica global
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Submeter Paper
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
