
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown, Star } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  credits: number;
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'Para explorar o RAVIAN QUANTUM',
    features: [
      '50 créditos mensais',
      'Acesso aos 5 frameworks quânticos',
      'Análises básicas do agente',
      'Visualizações padrão',
      'Suporte da comunidade'
    ],
    credits: 50,
    icon: <Zap className="h-6 w-6" />,
    color: 'from-gray-600 to-gray-800'
  },
  {
    name: 'Premium',
    price: '$29',
    description: 'Para pesquisadores sérios',
    features: [
      '500 créditos mensais',
      'Análises avançadas do RAVIAN QUANTUM',
      'Benchmarks científicos',
      'Exportação de resultados',
      'Suporte prioritário',
      'Simulações complexas',
      'Comparações multi-framework'
    ],
    credits: 500,
    icon: <Star className="h-6 w-6" />,
    color: 'from-purple-600 to-pink-600',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'Para instituições de pesquisa',
    features: [
      '2000 créditos mensais',
      'RAVIAN QUANTUM completo',
      'API access',
      'Integrações customizadas',
      'Relatórios científicos',
      'Suporte dedicado',
      'Treinamento personalizado',
      'Licença comercial'
    ],
    credits: 2000,
    icon: <Crown className="h-6 w-6" />,
    color: 'from-yellow-600 to-orange-600'
  }
];

export const PricingPlans: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Planos RAVIAN QUANTUM
        </h2>
        <p className="text-gray-300 text-lg">
          Escolha o plano ideal para sua pesquisa em computação quântica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index}
            className={`bg-black/40 border-purple-500/30 backdrop-blur-sm relative ${
              plan.popular ? 'border-purple-400 shadow-purple-400/20 shadow-lg' : ''
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                Mais Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4 text-white`}>
                {plan.icon}
              </div>
              <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-cyan-400">
                {plan.price}
                <span className="text-sm text-gray-400">/mês</span>
              </div>
              <p className="text-gray-300 text-sm">{plan.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <Badge variant="secondary" className="bg-cyan-900/50 text-cyan-300">
                  {plan.credits} créditos/mês
                </Badge>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                    <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full mt-6 bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`}
              >
                {plan.name === 'Free' ? 'Começar Grátis' : 'Assinar Agora'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
