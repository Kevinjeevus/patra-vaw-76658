import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Code, Key } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ApiDocs: React.FC = () => {
  const { user } = useAuth();
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('your-api-key-here');

  const baseUrl = 'https://api.patra.app/v1';
  
  const endpoints = [
    {
      method: 'GET',
      path: '/cards/:vanityUrl',
      description: 'Fetch a user card by vanity URL',
      example: `${baseUrl}/cards/johndoe`,
      response: {
        fullName: 'John Doe',
        jobTitle: 'Software Engineer',
        company: 'Acme Inc.',
        avatarUrl: 'https://...',
        socialLinks: [],
        // ... other fields
      }
    },
    {
      method: 'GET',
      path: '/cards/:vanityUrl/vcard',
      description: 'Download vCard format',
      example: `${baseUrl}/cards/johndoe/vcard`,
      response: 'BEGIN:VCARD\\\\\\\\nVERSION:3.0\\\\\\\\n...'
    },
    {
      method: 'POST',
      path: '/cards/search',
      description: 'Search cards by name or keywords',
      example: `${baseUrl}/cards/search`,
      body: { query: 'engineer', limit: 10 },
      response: {
        results: [],
        total: 0
      }
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    toast({
      title: 'Copied!',
      description: 'Code copied to clipboard',
    });
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
          <p className="text-muted-foreground">
            Integrate Patra cards into your application
          </p>
        </div>

        {/* Authentication */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Authentication</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Include your API key in the Authorization header:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
            <pre className="break-all whitespace-pre-wrap">Authorization: Bearer {apiKey}</pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => handleCopy(`Authorization: Bearer ${apiKey}`, 'auth')}
            >
              {copiedEndpoint === 'auth' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </Card>

        {/* Base URL */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Base URL</h2>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm flex items-center justify-between">
            <code>{baseUrl}</code>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleCopy(baseUrl, 'base')}
            >
              {copiedEndpoint === 'base' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </Card>

        {/* Endpoints */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Endpoints</h2>
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm font-mono">{endpoint.path}</code>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{endpoint.description}</p>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Example Request</Label>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                    <pre>{endpoint.method} {endpoint.example}</pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => handleCopy(`${endpoint.method} ${endpoint.example}`, `req-${index}`)}
                    >
                      {copiedEndpoint === `req-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {endpoint.body && (
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Request Body</Label>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                      <pre>{JSON.stringify(endpoint.body, null, 2)}</pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => handleCopy(JSON.stringify(endpoint.body, null, 2), `body-${index}`)}
                      >
                        {copiedEndpoint === `body-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Response</Label>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm relative overflow-auto max-h-64">
                    <pre>{JSON.stringify(endpoint.response, null, 2)}</pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => handleCopy(JSON.stringify(endpoint.response, null, 2), `res-${index}`)}
                    >
                      {copiedEndpoint === `res-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Code Examples */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Code Examples</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">JavaScript / Fetch</Label>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                <pre>{`fetch('${baseUrl}/cards/johndoe', {
  headers: {
    'Authorization': 'Bearer ${apiKey}'
  }
})
.then(res => res.json())
.then(data => console.log(data));`}</pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleCopy(`fetch('${baseUrl}/cards/johndoe', {
  headers: {
    'Authorization': 'Bearer ${apiKey}'
  }
})
.then(res => res.json())
.then(data => console.log(data));`, 'js')}
                >
                  {copiedEndpoint === 'js' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Python / Requests</Label>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                <pre>{`import requests

response = requests.get(
    '${baseUrl}/cards/johndoe',
    headers={'Authorization': 'Bearer ${apiKey}'}
)
data = response.json()`}</pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleCopy(`import requests

response = requests.get(
    '${baseUrl}/cards/johndoe',
    headers={'Authorization': 'Bearer ${apiKey}'}
)
data = response.json()`, 'py')}
                >
                  {copiedEndpoint === 'py' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Rate Limits */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Rate Limits</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Free tier: 100 requests/hour</li>
            <li>• Pro tier: 1,000 requests/hour</li>
            <li>• Enterprise: Custom limits</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
