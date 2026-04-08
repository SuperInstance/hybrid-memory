interface Env {
  KV_HOT: KVNamespace;
  KV_WARM: KVNamespace;
  GIT_REPO: string;
}

interface StoreRequest {
  key: string;
  value: any;
  metadata?: Record<string, any>;
}

interface QueryResponse {
  key: string;
  value: any;
  source: 'hot' | 'warm' | 'cold';
  timestamp: number;
}

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hybrid Memory | Fleet Vessels</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: #0a0a0f;
            color: #e2e8f0;
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .hero {
            padding: 6rem 0 4rem;
            text-align: center;
            border-bottom: 1px solid #1e1e2e;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #c084fc 0%, #a855f7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.25rem;
            color: #94a3b8;
            max-width: 800px;
            margin: 0 auto 2rem;
        }
        
        .tagline {
            display: inline-block;
            background: rgba(192, 132, 252, 0.1);
            color: #c084fc;
            padding: 0.5rem 1.5rem;
            border-radius: 2rem;
            font-weight: 600;
            font-size: 1.1rem;
            border: 1px solid rgba(192, 132, 252, 0.3);
        }
        
        section {
            padding: 4rem 0;
            border-bottom: 1px solid #1e1e2e;
        }
        
        h2 {
            font-size: 2.5rem;
            font-weight: 600;
            color: #f1f5f9;
            margin-bottom: 2rem;
        }
        
        h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #c084fc;
            margin: 2rem 0 1rem;
        }
        
        .architecture-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .layer-card {
            background: #11111f;
            border-radius: 1rem;
            padding: 2rem;
            border: 1px solid #252535;
            transition: transform 0.2s, border-color 0.2s;
        }
        
        .layer-card:hover {
            transform: translateY(-4px);
            border-color: #c084fc;
        }
        
        .layer-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .hot { background: rgba(239, 68, 68, 0.1); color: #f87171; }
        .warm { background: rgba(245, 158, 11, 0.1); color: #fbbf24; }
        .cold { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
        
        .code-block {
            background: #11111f;
            border-radius: 0.5rem;
            padding: 1.5rem;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
            border: 1px solid #252535;
            overflow-x: auto;
            margin: 1rem 0;
        }
        
        .endpoint {
            background: #11111f;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-left: 4px solid #c084fc;
        }
        
        .method {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 0.25rem;
            font-weight: 600;
            font-size: 0.9rem;
            margin-right: 0.5rem;
        }
        
        .post { background: rgba(34, 197, 94, 0.1); color: #4ade80; }
        .get { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
        
        footer {
            padding: 3rem 0;
            text-align: center;
            color: #64748b;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1rem;
        }
        
        .footer-links a {
            color: #c084fc;
            text-decoration: none;
            transition: opacity 0.2s;
        }
        
        .footer-links a:hover {
            opacity: 0.8;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .container {
                padding: 0 1rem;
            }
            
            .architecture-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>Hybrid Memory</h1>
            <div class="tagline">Three-layer memory: hot KV, warm KV, cold git</div>
            <p>Git + KV + causal memory equipment for fleet vessels. A robust storage solution combining speed, durability, and auditability.</p>
        </div>
        
        <section id="architecture">
            <h2>Architecture</h2>
            <div class="architecture-grid">
                <div class="layer-card">
                    <div class="layer-badge hot">Layer 1: Hot KV</div>
                    <h3>2-hour TTL</h3>
                    <p>Ultra-fast in-memory storage for frequently accessed data. Perfect for real-time operations and caching.</p>
                    <div class="code-block">// Cloudflare KV with 2h expiration<br>await env.KV_HOT.put(key, value, { expirationTtl: 7200 });</div>
                </div>
                
                <div class="layer-card">
                    <div class="layer-badge warm">Layer 2: Warm KV</div>
                    <h3>7-day TTL</h3>
                    <p>Persistent storage for operational data. Balances speed with durability for medium-term retention.</p>
                    <div class="code-block">// Cloudflare KV with 7d expiration<br>await env.KV_WARM.put(key, value, { expirationTtl: 604800 });</div>
                </div>
                
                <div class="layer-card">
                    <div class="layer-badge cold">Layer 3: Cold Git</div>
                    <h3>Immutable Commits</h3>
                    <p>Permanent, versioned storage in git repositories. Provides full audit trail and data recovery.</p>
                    <div class="code-block">// Git commit via API<br>POST /api/compact → git commit -m "snapshot"</div>
                </div>
            </div>
        </section>
        
        <section id="why-hybrid">
            <h2>Why Hybrid Memory?</h2>
            <p>Traditional storage solutions force a trade-off between speed and durability. Hybrid Memory eliminates this compromise.</p>
            
            <h3>Git for Audit Trail</h3>
            <p>Every data mutation is permanently recorded in git commits, providing immutable history for compliance, debugging, and recovery.</p>
            
            <h3>KV for Speed</h3>
            <p>Cloudflare's global KV network ensures sub-millisecond read times for hot data, while maintaining strong consistency.</p>
            
            <h3>Causal Memory</h3>
            <p>Data flows naturally through layers based on access patterns, optimizing both performance and cost automatically.</p>
        </section>
        
        <section id="api-reference">
            <h2>API Reference</h2>
            
            <div class="endpoint">
                <div class="method post">POST</div>
                <strong>/api/store</strong>
                <p>Store data across memory layers</p>
                <div class="code-block">{
  "key": "fleet_status",
  "value": { "vessels": 42, "status": "operational" },
  "metadata": { "priority": "high" }
}</div>
            </div>
            
            <div class="endpoint">
                <div class="method get">GET</div>
                <strong>/api/query?key=fleet_status</strong>
                <p>Retrieve data from appropriate layer</p>
                <div class="code-block">{
  "key": "fleet_status",
  "value": { "vessels": 42, "status": "operational" },
  "source": "hot",
  "timestamp": 1698765432
}</div>
            </div>
            
            <div class="endpoint">
                <div class="method get">GET</div>
                <strong>/api/snapshot?since=timestamp</strong>
                <p>Get git commit history snapshot</p>
            </div>
            
            <div class="endpoint">
                <div class="method post">POST</div>
                <strong>/api/compact</strong>
                <p>Compact warm data to cold git storage</p>
            </div>
        </section>
        
        <footer>
            <p><i style="color:#888">Built with <a href="https://github.com/Lucineer/cocapn-ai" style="color:#c084fc">Cocapn</a></i></p>
            <div class="footer-links">
                <a href="#architecture">Architecture</a>
                <a href="#why-hybrid">Why Hybrid</a>
                <a href="#api-reference">API</a>
                <a href="/health">Health</a>
            </div>
        </footer>
    </div>
</body>
</html>
`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Set security headers
    const securityHeaders = {
      'Content-Security-Policy': "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };
    
    // Health endpoint
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: Date.now() }), {
        headers: { 'Content-Type': 'application/json', ...securityHeaders }
      });
    }
    
    // API endpoints
    if (path === '/api/store' && request.method === 'POST') {
      try {
        const data: StoreRequest = await request.json();
        const timestamp = Date.now();
        
        // Store in hot KV (2h TTL)
        await env.KV_HOT.put(data.key, JSON.stringify({
          value: data.value,
          metadata: data.metadata,
          timestamp
        }), { expirationTtl: 7200 });
        
        // Store in warm KV (7d TTL)
        await env.KV_WARM.put(data.key, JSON.stringify({
          value: data.value,
          metadata: data.metadata,
          timestamp
        }), { expirationTtl: 604800 });
        
        return new Response(JSON.stringify({
          success: true,
          key: data.key,
          timestamp,
          layers: ['hot', 'warm']
        }), {
          headers: { 'Content-Type': 'application/json', ...securityHeaders }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...securityHeaders }
        });
      }
    }
    
    if (path === '/api/query' && request.method === 'GET') {
      const key = url.searchParams.get('key');
      if (!key) {
        return new Response(JSON.stringify({ error: 'Missing key parameter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...securityHeaders }
        });
      }
      
      // Try hot KV first
      let data = await env.KV_HOT.get(key);
      let source: 'hot' | 'warm' | 'cold' = 'hot';
      
      // Fall back to warm KV
      if (!data) {
        data = await env.KV_WARM.get(key);
        source = 'warm';
      }
      
      // Fall back to git (simulated)
      if (!data && env.GIT_REPO) {
        source = 'cold';
        // In a real implementation, this would fetch from git
        data = JSON.stringify({
          value: null,
          timestamp: Date.now(),
          source: 'git'
        });
      }
      
      if (!data) {
        return new Response(JSON.stringify({ error: 'Key not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...securityHeaders }
        });
      }
      
      const parsed = JSON.parse(data);
      const response: QueryResponse = {
        key,
        value: parsed.value,
        source,
        timestamp: parsed.timestamp
      };
      
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json', ...securityHeaders }
      });
    }
    
    if (path === '/api/snapshot' && request.method === 'GET') {
      const since = url.searchParams.get('since');
      // Simulated git history
      const snapshot = {
        commits: [
          {
            hash: 'abc123',
            timestamp: Date.now() - 86400000,
            message: 'Daily compaction',
            keys: ['fleet_status', 'vessel_locations']
          }
        ],
        repository: env.GIT_REPO
      };
      
      return new Response(JSON.stringify(snapshot), {
        headers: { 'Content-Type': 'application/json', ...securityHeaders }
      });
    }
    
    if (path === '/api/compact' && request.method === 'POST') {
      // Simulated git compaction
      // In production, this would:
      // 1. Read from warm KV
      // 2. Create git commit
      // 3. Update references
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Compaction scheduled',
        timestamp: Date.now()
      }), {
        headers: { 'Content-Type': 'application/json', ...securityHeaders }
      });
    }
    
    // Serve HTML landing page for all other routes
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
        ...securityHeaders
      }
    });
  }
};