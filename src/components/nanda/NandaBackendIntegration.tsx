import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Server, 
  Database, 
  Brain, 
  Globe, 
  Shield,
  Play,
  Pause,
  Settings,
  Terminal,
  Code,
  MonitorSpeaker,
  Activity
} from 'lucide-react';

interface BackendConfig {
  anthropicApiKey: string;
  agentIdPrefix: string;
  domainName: string;
  registryUrl: string;
  numAgents: number;
  mongoUrl: string;
}

interface AgentProcess {
  id: string;
  pid: number;
  bridgePort: number;
  apiPort: number;
  status: 'running' | 'stopped' | 'error' | 'starting';
  publicUrl: string;
  apiUrl: string;
  logs: string[];
}

export const NandaBackendIntegration: React.FC = () => {
  const [config, setConfig] = useState<BackendConfig>({
    anthropicApiKey: '',
    agentIdPrefix: '6',
    domainName: 'nanda.media.mit.edu',
    registryUrl: 'https://nanda-registry.com:6900',
    numAgents: 3,
    mongoUrl: 'mongodb://localhost:27017/ravian_quantum'
  });

  const [agents, setAgents] = useState<AgentProcess[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'offline' | 'connecting' | 'online'>('offline');

  useEffect(() => {
    // Simular agentes baseados no script Nanda
    const simulatedAgents: AgentProcess[] = Array.from({ length: config.numAgents }, (_, i) => ({
      id: `agentm${config.agentIdPrefix}${i}`,
      pid: 12000 + i,
      bridgePort: 6000 + (i * 2),
      apiPort: 6001 + (i * 2),
      status: 'running',
      publicUrl: `http://198.51.100.1:${6000 + (i * 2)}`,
      apiUrl: `https://${config.domainName}:${6001 + (i * 2)}`,
      logs: [
        `[${new Date().toISOString()}] Agent ${i} initialized`,
        `[${new Date().toISOString()}] SSL certificates loaded`,
        `[${new Date().toISOString()}] Connected to registry`,
        `[${new Date().toISOString()}] Quantum framework loaded`
      ]
    }));
    
    setAgents(simulatedAgents);
    setBackendStatus('online');
  }, [config.numAgents, config.agentIdPrefix, config.domainName]);

  const deployBackend = async () => {
    setIsDeploying(true);
    setLogs(['Iniciando deploy do backend RAVIAN Quantum...']);
    
    const deploySteps = [
      'Verificando dependências Python (flask, anthropic, pymongo)...',
      'Configurando ambiente virtual /opt/internet_of_agents/venv...',
      'Validando certificados SSL Let\'s Encrypt...',
      'Detectando IP público do servidor...',
      'Criando configuração /etc/internet_of_agents.env...',
      'Iniciando agentes RAVIAN com portas dinâmicas...',
      'Registrando agentes no Nanda Registry...',
      'Configurando comunicação inter-agentes...',
      'Inicializando MongoDB para persistência...',
      'Deploy concluído! Agentes rodando com SSL.'
    ];

    for (let i = 0; i < deploySteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLogs(prev => [...prev, deploySteps[i]]);
    }
    
    setIsDeploying(false);
    setBackendStatus('online');
  };

  const generateStartScript = () => {
    return `#!/bin/bash
# RAVIAN Quantum - Nanda Integration Script
source /opt/internet_of_agents/venv/bin/activate

# Environment Configuration
export ANTHROPIC_API_KEY="${config.anthropicApiKey}"
export AGENT_ID_PREFIX="${config.agentIdPrefix}"
export DOMAIN_NAME="${config.domainName}"
export REGISTRY_URL="${config.registryUrl}"
export NUM_AGENTS=${config.numAgents}
export MONGO_URL="${config.mongoUrl}"

# SSL Configuration
CERT_PATH="/etc/letsencrypt/live/\${DOMAIN_NAME}/fullchain.pem"
KEY_PATH="/etc/letsencrypt/live/\${DOMAIN_NAME}/privkey.pem"

# Start RAVIAN Quantum Agents
START_BRIDGE_PORT=6000
START_API_PORT=6001

mkdir -p logs

for ((i=0; i<NUM_AGENTS; i++)); do
    AGENT_ID="agentm\${AGENT_ID_PREFIX}\$((i))"
    BRIDGE_PORT=\$((START_BRIDGE_PORT + i*2))
    API_PORT=\$((START_API_PORT + i*2))
    
    PUBLIC_URL="http://\$(curl -s checkip.amazonaws.com):\$BRIDGE_PORT"
    API_URL="https://\${DOMAIN_NAME}:\$API_PORT"
    
    echo "Starting \$AGENT_ID - Bridge: \$BRIDGE_PORT, API: \$API_PORT"
    
    nohup python3 -u ravian_quantum_agent.py \\
        --id "\$AGENT_ID" \\
        --bridge-port "\$BRIDGE_PORT" \\
        --api-port "\$API_PORT" \\
        --public-url "\$PUBLIC_URL" \\
        --api-url "\$API_URL" \\
        --registry "\$REGISTRY_URL" \\
        --ssl --cert "\$CERT_PATH" --key "\$KEY_PATH" \\
        --quantum-framework "multi" \\
        --mongo-url "\$MONGO_URL" \\
        > "logs/\${AGENT_ID}_logs.txt" 2>&1 &
    
    echo "\$!" > "logs/\${AGENT_ID}.pid"
    sleep 2
done

echo "RAVIAN Quantum agents deployed successfully!"`;
  };

  const stopAgent = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, status: 'stopped' } : agent
    ));
  };

  const startAgent = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, status: 'starting' } : agent
    ));
    
    setTimeout(() => {
      setAgents(agents.map(agent => 
        agent.id === agentId ? { ...agent, status: 'running' } : agent
      ));
    }, 2000);
  };

  const getStatusColor = (status: AgentProcess['status']) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      case 'starting': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card className="bg-black/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Server className="h-6 w-6 text-purple-400" />
            <span>RAVIAN Quantum Backend</span>
            <Badge variant="outline" className={`${
              backendStatus === 'online' ? 'text-green-300 border-green-400' : 
              backendStatus === 'connecting' ? 'text-yellow-300 border-yellow-400' :
              'text-red-300 border-red-400'
            }`}>
              {backendStatus.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-400">
                {agents.filter(a => a.status === 'running').length}
              </div>
              <div className="text-sm text-gray-300">Running Agents</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-400">
                {agents.length * 2}
              </div>
              <div className="text-sm text-gray-300">Active Ports</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-400">SSL</div>
              <div className="text-sm text-gray-300">Let's Encrypt</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-cyan-400">MongoDB</div>
              <div className="text-sm text-gray-300">Persistence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="config" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-black/30 border border-purple-500/30">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="agents">Agent Processes</TabsTrigger>
          <TabsTrigger value="deploy">Deployment</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Settings className="h-5 w-5" />
                <span>Backend Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Anthropic API Key</label>
                  <Input
                    type="password"
                    placeholder="sk-ant-..."
                    value={config.anthropicApiKey}
                    onChange={(e) => setConfig({...config, anthropicApiKey: e.target.value})}
                    className="bg-black/50 border-purple-500/50 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Agent ID Prefix</label>
                  <Input
                    placeholder="6"
                    value={config.agentIdPrefix}
                    onChange={(e) => setConfig({...config, agentIdPrefix: e.target.value})}
                    className="bg-black/50 border-purple-500/50 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Domain Name</label>
                  <Input
                    placeholder="nanda.media.mit.edu"
                    value={config.domainName}
                    onChange={(e) => setConfig({...config, domainName: e.target.value})}
                    className="bg-black/50 border-purple-500/50 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Registry URL</label>
                  <Input
                    placeholder="https://nanda-registry.com:6900"
                    value={config.registryUrl}
                    onChange={(e) => setConfig({...config, registryUrl: e.target.value})}
                    className="bg-black/50 border-purple-500/50 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Number of Agents</label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={config.numAgents}
                    onChange={(e) => setConfig({...config, numAgents: parseInt(e.target.value)})}
                    className="bg-black/50 border-purple-500/50 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">MongoDB URL</label>
                  <Input
                    placeholder="mongodb://localhost:27017/ravian_quantum"
                    value={config.mongoUrl}
                    onChange={(e) => setConfig({...config, mongoUrl: e.target.value})}
                    className="bg-black/50 border-purple-500/50 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="bg-black/30 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                      <div>
                        <div className="text-white font-semibold">{agent.id}</div>
                        <div className="text-gray-400 text-sm">PID: {agent.pid}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {agent.status === 'running' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => stopAgent(agent.id)}
                          className="border-red-500/50 text-red-400"
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startAgent(agent.id)}
                          className="border-green-500/50 text-green-400"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
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
                      <div className="text-gray-400">Public URL</div>
                      <div className="text-cyan-400 text-xs font-mono truncate">{agent.publicUrl}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">API URL</div>
                      <div className="text-green-400 text-xs font-mono truncate">{agent.apiUrl}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-4">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Code className="h-5 w-5" />
                <span>Deployment Script</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button 
                  onClick={deployBackend}
                  disabled={isDeploying}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isDeploying ? 'Deploying...' : 'Deploy Backend'}
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Generated Start Script</label>
                <Textarea
                  value={generateStartScript()}
                  readOnly
                  className="bg-black/50 border-purple-500/50 text-white font-mono text-xs h-64"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Terminal className="h-5 w-5" />
                <span>System Logs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80 w-full">
                <div className="space-y-1 font-mono text-sm">
                  {logs.map((log, index) => (
                    <div key={index} className="text-green-400">
                      {log}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};