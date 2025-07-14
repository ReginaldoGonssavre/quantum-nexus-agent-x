import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Globe, 
  Cpu, 
  Activity, 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  RotateCcw,
  Network,
  Shield,
  Zap
} from 'lucide-react';

interface QuantumAgent {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error' | 'processing';
  bridgePort: number;
  apiPort: number;
  publicUrl: string;
  apiUrl: string;
  framework: 'qiskit' | 'cirq' | 'qsharp' | 'quipper' | 'strawberryfields';
  lastActivity: Date;
  qubits: number;
  operations: number;
}

export const AgentRegistry: React.FC = () => {
  const [agents, setAgents] = useState<QuantumAgent[]>([]);
  const [newAgentName, setNewAgentName] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<QuantumAgent['framework']>('qiskit');
  const [isCreating, setIsCreating] = useState(false);

  // Simular agentes iniciais baseados no projeto Nanda
  useEffect(() => {
    const initialAgents: QuantumAgent[] = [
      {
        id: 'agentm60',
        name: 'RAVIAN-Qiskit-Alpha',
        status: 'active',
        bridgePort: 6000,
        apiPort: 6001,
        publicUrl: 'https://nanda.media.mit.edu:6000',
        apiUrl: 'https://nanda.media.mit.edu:6001',
        framework: 'qiskit',
        lastActivity: new Date(),
        qubits: 5,
        operations: 1247
      },
      {
        id: 'agentm61',
        name: 'RAVIAN-Cirq-Beta',
        status: 'active',
        bridgePort: 6002,
        apiPort: 6003,
        publicUrl: 'https://nanda.media.mit.edu:6002',
        apiUrl: 'https://nanda.media.mit.edu:6003',
        framework: 'cirq',
        lastActivity: new Date(Date.now() - 30000),
        qubits: 8,
        operations: 892
      },
      {
        id: 'agentm62',
        name: 'RAVIAN-QSharp-Gamma',
        status: 'processing',
        bridgePort: 6004,
        apiPort: 6005,
        publicUrl: 'https://nanda.media.mit.edu:6004',
        apiUrl: 'https://nanda.media.mit.edu:6005',
        framework: 'qsharp',
        lastActivity: new Date(Date.now() - 60000),
        qubits: 12,
        operations: 2156
      }
    ];
    setAgents(initialAgents);
  }, []);

  const createAgent = async () => {
    if (!newAgentName.trim()) return;
    
    setIsCreating(true);
    
    // Simular criação de agente
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAgent: QuantumAgent = {
      id: `agentm${60 + agents.length}`,
      name: newAgentName,
      status: 'inactive',
      bridgePort: 6000 + (agents.length * 2),
      apiPort: 6001 + (agents.length * 2),
      publicUrl: `https://nanda.media.mit.edu:${6000 + (agents.length * 2)}`,
      apiUrl: `https://nanda.media.mit.edu:${6001 + (agents.length * 2)}`,
      framework: selectedFramework,
      lastActivity: new Date(),
      qubits: Math.floor(Math.random() * 20) + 1,
      operations: 0
    };
    
    setAgents([...agents, newAgent]);
    setNewAgentName('');
    setIsCreating(false);
  };

  const toggleAgentStatus = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { 
            ...agent, 
            status: agent.status === 'active' ? 'inactive' : 'active',
            lastActivity: new Date()
          }
        : agent
    ));
  };

  const removeAgent = (agentId: string) => {
    setAgents(agents.filter(agent => agent.id !== agentId));
  };

  const getStatusColor = (status: QuantumAgent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      case 'processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getFrameworkIcon = (framework: QuantumAgent['framework']) => {
    switch (framework) {
      case 'qiskit': return '🔮';
      case 'cirq': return '⚡';
      case 'qsharp': return '💎';
      case 'quipper': return '🌊';
      case 'strawberryfields': return '🍓';
      default: return '🔬';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Network className="h-6 w-6 text-purple-400" />
            <span>RAVIAN Quantum Agent Registry</span>
            <Badge variant="outline" className="text-purple-300 border-purple-400">
              Nanda Integration
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-400">{agents.filter(a => a.status === 'active').length}</div>
              <div className="text-sm text-gray-300">Active Agents</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-400">{agents.reduce((sum, a) => sum + a.qubits, 0)}</div>
              <div className="text-sm text-gray-300">Total Qubits</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-yellow-400">{agents.reduce((sum, a) => sum + a.operations, 0)}</div>
              <div className="text-sm text-gray-300">Total Operations</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-400">{agents.length}</div>
              <div className="text-sm text-gray-300">Registered Agents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-black/30 border border-purple-500/30">
          <TabsTrigger value="agents">Agent Management</TabsTrigger>
          <TabsTrigger value="create">Create Agent</TabsTrigger>
          <TabsTrigger value="monitor">Network Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="bg-black/30 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                        <span className="text-lg font-semibold text-white">{agent.name}</span>
                        <span className="text-2xl">{getFrameworkIcon(agent.framework)}</span>
                      </div>
                      <Badge variant="outline" className="text-purple-300 border-purple-400">
                        {agent.id}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAgentStatus(agent.id)}
                        className="border-purple-500/50"
                      >
                        {agent.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeAgent(agent.id)}
                        className="border-red-500/50 text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Bridge Port</div>
                      <div className="text-white font-mono">{agent.bridgePort}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">API Port</div>
                      <div className="text-white font-mono">{agent.apiPort}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Qubits</div>
                      <div className="text-cyan-400 font-bold">{agent.qubits}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Operations</div>
                      <div className="text-green-400 font-bold">{agent.operations}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-400">
                    Last Activity: {agent.lastActivity.toLocaleTimeString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Create New Quantum Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Agent Name</label>
                <Input
                  placeholder="Enter agent name..."
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  className="bg-black/50 border-purple-500/50 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Quantum Framework</label>
                <select 
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value as QuantumAgent['framework'])}
                  className="w-full p-2 bg-black/50 border border-purple-500/50 rounded-md text-white"
                >
                  <option value="qiskit">Qiskit (IBM)</option>
                  <option value="cirq">Cirq (Google)</option>
                  <option value="qsharp">Q# (Microsoft)</option>
                  <option value="quipper">Quipper (Haskell)</option>
                  <option value="strawberryfields">Strawberry Fields (Xanadu)</option>
                </select>
              </div>
              
              <Button 
                onClick={createAgent}
                disabled={isCreating || !newAgentName.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isCreating ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                    Creating Agent...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Agent
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitor" className="space-y-4">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Activity className="h-6 w-6" />
                <span>Network Monitoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-gray-300">Registry URL</span>
                  </div>
                  <div className="text-white font-mono text-sm bg-black/50 p-2 rounded">
                    https://nanda.media.mit.edu:8080
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-gray-300">SSL Status</span>
                  </div>
                  <div className="text-green-400 font-mono text-sm bg-black/50 p-2 rounded">
                    Active - Let's Encrypt
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-300">Network Communication</div>
                <div className="grid grid-cols-1 gap-2">
                  {agents.filter(a => a.status === 'active').map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between bg-black/50 p-2 rounded">
                      <span className="text-white text-sm">{agent.name}</span>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">Connected</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};