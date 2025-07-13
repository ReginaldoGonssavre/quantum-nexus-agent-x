
import React, { useState, createContext, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Crown, Zap, Star } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium' | 'enterprise';
  credits: number;
  maxCredits: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  useCredits: (amount: number) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Dr. Quantum Researcher',
    email: 'researcher@quantum.lab',
    plan: 'free',
    credits: 10,
    maxCredits: 50
  });

  const login = async (email: string, password: string) => {
    // Simular login
    console.log('Login simulado para:', email);
  };

  const logout = () => {
    setUser(null);
  };

  const useCredits = (amount: number): boolean => {
    if (!user || user.credits < amount) return false;
    setUser(prev => prev ? { ...prev, credits: prev.credits - amount } : null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, useCredits }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'free': return <User className="h-4 w-4" />;
      case 'premium': return <Star className="h-4 w-4" />;
      case 'enterprise': return <Crown className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-600';
      case 'premium': return 'bg-purple-600';
      case 'enterprise': return 'bg-gold-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-black/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span>{user.name}</span>
          <Badge className={`${getPlanColor(user.plan)} text-white`}>
            {getPlanIcon(user.plan)}
            <span className="ml-1 capitalize">{user.plan}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Créditos Disponíveis:</span>
            <span className="text-cyan-400 font-bold">{user.credits}/{user.maxCredits}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
              style={{ width: `${(user.credits / user.maxCredits) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
