import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Radio, 
  Network,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  type: 'query' | 'response' | 'broadcast' | 'system';
  status: 'sent' | 'delivered' | 'processed' | 'error';
}

interface Agent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  framework: string;
}

export const InterAgentCommunication: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('broadcast');
  const [currentAgent] = useState('agentm60'); // Simular agente atual
  
  const [agents] = useState<Agent[]>([
    { id: 'agentm60', name: 'RAVIAN-Qiskit-Alpha', status: 'online', framework: 'Qiskit' },
    { id: 'agentm61', name: 'RAVIAN-Cirq-Beta', status: 'online', framework: 'Cirq' },
    { id: 'agentm62', name: 'RAVIAN-QSharp-Gamma', status: 'busy', framework: 'Q#' },
    { id: 'agentm63', name: 'RAVIAN-Quipper-Delta', status: 'offline', framework: 'Quipper' },
    { id: 'agentm64', name: 'RAVIAN-SF-Epsilon', status: 'online', framework: 'Strawberry Fields' }
  ]);

  useEffect(() => {
    // Simular mensagens iniciais do sistema
    const initialMessages: Message[] = [
      {
        id: '1',
        from: 'system',
        to: 'broadcast',
        content: 'RAVIAN Quantum Network initialized. All agents connected to nanda.media.mit.edu registry.',
        timestamp: new Date(Date.now() - 300000),
        type: 'system',
        status: 'delivered'
      },
      {
        id: '2',
        from: 'agentm61',
        to: 'agentm60',
        content: 'Sharing optimized circuit for 5-qubit Bell state preparation. Fidelity: 99.7%',
        timestamp: new Date(Date.now() - 240000),
        type: 'response',
        status: 'processed'
      },
      {
        id: '3',
        from: 'agentm62',
        to: 'broadcast',
        content: 'Q# quantum teleportation protocol completed. Ready for cross-framework verification.',
        timestamp: new Date(Date.now() - 180000),
        type: 'broadcast',
        status: 'delivered'
      }
    ];
    setMessages(initialMessages);
    
    // Simular mensagens periódicas
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        const quantumMessages = [
          'Quantum error correction threshold reached: 99.9%',
          'Entanglement verification completed across all qubits',
          'Optimizing gate sequence for reduced decoherence',
          'Cross-platform quantum state synchronization active',
          'Variational quantum algorithm convergence achieved'
        ];
        
        const newMsg: Message = {
          id: Date.now().toString(),
          from: randomAgent.id,
          to: 'broadcast',
          content: quantumMessages[Math.floor(Math.random() * quantumMessages.length)],
          timestamp: new Date(),
          type: 'broadcast',
          status: 'delivered'
        };
        
        setMessages(prev => [...prev, newMsg]);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      from: currentAgent,
      to: selectedAgent,
      content: newMessage,
      timestamp: new Date(),
      type: selectedAgent === 'broadcast' ? 'broadcast' : 'query',
      status: 'sent'
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simular resposta automática após 2 segundos
    if (selectedAgent !== 'broadcast') {
      setTimeout(() => {
        const responses = [
          'Quantum computation completed. Results attached.',
          'Circuit optimization successful. Depth reduced by 23%.',
          'Error correction applied. Fidelity improved to 99.8%.',
          'Quantum state preparation verified. Ready for measurement.',
          'Entanglement established across distributed qubits.'
        ];
        
        const response: Message = {
          id: (Date.now() + 1).toString(),
          from: selectedAgent,
          to: currentAgent,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          type: 'response',
          status: 'delivered'
        };
        
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent': return <Clock className="h-3 w-3 text-yellow-400" />;
      case 'delivered': return <CheckCircle className="h-3 w-3 text-green-400" />;
      case 'processed': return <CheckCircle className="h-3 w-3 text-blue-400" />;
      case 'error': return <AlertCircle className="h-3 w-3 text-red-400" />;
    }
  };

  const getAgentStatus = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.status || 'offline';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <MessageSquare className="h-6 w-6 text-purple-400" />
            <span>Inter-Agent Communication</span>
            <Badge variant="outline" className="text-purple-300 border-purple-400">
              Nanda Network
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-1">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white text-sm">
                <Network className="h-4 w-4" />
                <span>Active Agents</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {agents.map((agent) => (
                <div 
                  key={agent.id}
                  className={`p-2 rounded border cursor-pointer transition-colors ${
                    agent.id === currentAgent 
                      ? 'border-purple-400 bg-purple-900/30' 
                      : 'border-gray-600 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-medium truncate">{agent.name}</div>
                      <div className="text-gray-400 text-xs">{agent.framework}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Messages */}
        <div className="lg:col-span-3">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <Radio className="h-5 w-5" />
                  <span>Quantum Network Communication</span>
                </div>
                <Badge variant="outline" className="text-green-300 border-green-400">
                  {messages.length} messages
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-96 w-full">
                <div className="space-y-3 pr-4">
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>{message.from === 'system' ? 'SYSTEM' : agents.find(a => a.id === message.from)?.name || message.from}</span>
                        <span>→</span>
                        <span>{message.to === 'broadcast' ? 'ALL AGENTS' : agents.find(a => a.id === message.to)?.name || message.to}</span>
                        <span>•</span>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {getStatusIcon(message.status)}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.from === currentAgent 
                          ? 'bg-purple-900/50 border border-purple-500/30 ml-8' 
                          : message.type === 'system'
                          ? 'bg-blue-900/30 border border-blue-500/30'
                          : 'bg-gray-900/50 border border-gray-600/30'
                      }`}>
                        <div className="text-white text-sm">{message.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="space-y-3 border-t border-purple-500/30 pt-4">
                <div className="flex space-x-2">
                  <select 
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    className="px-3 py-2 bg-black/50 border border-purple-500/50 rounded text-white text-sm"
                  >
                    <option value="broadcast">🌐 Broadcast to All</option>
                    {agents.filter(a => a.id !== currentAgent && a.status !== 'offline').map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Enter quantum computation request or share results..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-black/50 border-purple-500/50 text-white min-h-[60px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};