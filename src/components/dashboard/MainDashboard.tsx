
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuantumDashboard from '../QuantumDashboard';
import { BenchmarkSystem } from '../scientific/BenchmarkSystem';
import { ResearchPapers } from '../scientific/ResearchPapers';
import { QuantumAPI } from '../api/QuantumAPI';
import { PricingPlans } from '../pricing/PricingPlans';
import { UserProfile, AuthProvider } from '../auth/AuthSystem';
import { 
  Brain, 
  Trophy, 
  FileText, 
  Code, 
  CreditCard, 
  Settings, 
  Sparkles 
} from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quantum');

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <div className="container mx-auto p-6">
          {/* Header com Profile */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-12 w-12 text-purple-400 animate-pulse" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  RAVIAN QUANTUM
                </h1>
                <p className="text-gray-300">Agente Arquiteto Quântico Completo</p>
              </div>
            </div>
            <div className="w-80">
              <UserProfile />
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-black/30 border border-purple-500/30">
              <TabsTrigger value="quantum" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Quantum Lab</span>
              </TabsTrigger>
              <TabsTrigger value="benchmarks" className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Benchmarks</span>
              </TabsTrigger>
              <TabsTrigger value="papers" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Papers</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>API</span>
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Planos</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Config</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quantum" className="space-y-6">
              <QuantumDashboard />
            </TabsContent>

            <TabsContent value="benchmarks" className="space-y-6">
              <BenchmarkSystem />
            </TabsContent>

            <TabsContent value="papers" className="space-y-6">
              <ResearchPapers />
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <QuantumAPI />
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <PricingPlans />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-black/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Configurações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Painel de configurações em desenvolvimento...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthProvider>
  );
};
