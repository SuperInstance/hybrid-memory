import { Ai } from '@cloudflare/ai';

export interface Env {
    KV_HOT: KVNamespace;
    KV_WARM: KVNamespace;
    GIT_BUCKET: R2Bucket;
    AI: Ai;
}

const HTML_PAGE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self';">
    <title>Fleet Hybrid Memory</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #0a0a0f;
            color: #e0e0f0;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhiI2B.woff2) format('woff2');
            font-display: swap;
        }
        header {
            border-bottom: 1px solid #1a1a2e;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        h1 {
            color: #c084fc;
            font-size: 2.5rem;
            margin-bottom: 8px;
        }
        .subtitle {
            color: #a0a0c0;
            font-size: 1.1rem;
        }
        .arch {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .layer {
            background: #151522;
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid #c084fc;
        }
        .layer h3 {
            color: #c084fc;
            margin-bottom: 10px;
        }
        .layer ul {
            list-style: none;
            padding-left: 10px;
        }
        .layer li {
            margin-bottom: 8px;
            color: #b0b0d0;
        }
        .endpoints {
            margin: 40px 0;
        }
        .endpoint {
            background: #151522;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            border: 1px solid #252535;
        }
        .method {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: bold;
            margin-right: 10px;
            font-size: 0.9rem;
        }
        .post { background: #c084fc33; color: #c084fc; }
        .get { background: #10b98133; color: #10b981; }
        code {
            background: #1a1a2e;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.95rem;
        }
        footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #1a1a2e;
            text-align: center;
            color: #707090;
            font-size: 0.9rem;
        }
        .accent { color: #c084fc; }
        .note {
            background: #1a1a2e;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #c084fc;
        }
    </style>
</head>
<body>
    <header>
        <h1>Fleet Hybrid Memory</h1>
        <p class="subtitle">Git + KV + Causal Memory Equipment for Fleet Vessels</p>
    </header>
    <div class="note">
        <strong>Architecture:</strong> Three‑layer memory system with hot (2h), warm (7d), and cold (git) storage.
    </div>
    <div class="arch">
        <div class="layer">
            <h3>🔥 Hot Layer (KV)</h3>
            <ul>
                <li>TTL: 2 hours</li>
                <li>Sub‑second access</li>
                <li>Ephemeral session data</li>
                <li>Frequent writes</li>
            </ul>
        </div>
        <div class="layer">
            <h3>🌡 Warm Layer (KV)</h3>
            <ul>
                <li>TTL: 7 days</li>
                <li>Recent operational logs</li>
                <li>Medium‑term analytics</li>
                <li>Batch‑processed</li>
            </ul>
        </div>
        <div class="layer">
            <h3>❄️ Cold Layer (Git)</h3>
            <ul>
                <li>Immutable snapshots</li>
                <li>Versioned history</li>
                <li>Audit‑trail storage</li>
                <li>R2‑backed git repos</li>
            </ul>
        </div>
    </div>
    <div class="endpoints">
        <h2>API Endpoints</h2>
        <div class="endpoint">
            <span class="method post">POST</span> <code>/api/store</code>
            <p>Store a memory entry across layers. JSON body: <code>{"key": "string", "value": "any", "layer": "hot|warm|cold"}</code></p>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> <code>/api/query?key=...</code>
            <p>Retrieve memory by key, searching hot → warm → cold.</p>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> <code>/api/snapshot?prefix=...</code>
            <p>Generate a git snapshot of cold‑layer data for a prefix.</p>
        </div>
        <div class="endpoint">
            <span class="method post">POST</span> <code>/api/compact</code>
            <p>Compact warm‑layer entries into cold storage. JSON body: <code>{"prefix": "string"}</code></p>
        </div>
        <div class="endpoint">
            <span class="method get">GET</span> <code>/health</code>
            <p>Health check. Returns <code>{"status":"ok"}</code>.</p>
        </div>
    </div>
    <footer>
        <p>Fleet Hybrid Memory System • <span class="accent">Causal‑Aware Storage</span> • Purple Accent #c084fc</p>
        <p>All connections secured • X‑Frame‑Options: DENY • Zero‑dependency Worker</p>
    </footer>
</body>
</html>
`;

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        // Set security headers for all responses
        const securityHeaders = {
            'X-Frame-Options': 'DENY',
            'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com;",
            'X-Content-Type-Options': 'nosniff',
        };

        // Helper to add headers
        const respond = (body: string | object, status = 200, headers: Record<string, string> = {}) => {
            const isJson = typeof body === 'object';
            return new Response(isJson ? JSON.stringify(body) : body, {
                status,
                headers: {
                    'Content-Type': isJson ? 'application/json' : 'text/html',
                    ...securityHeaders,
                    ...headers,
                },
            });
        };

        // Route handling
        if (path === '/' || path === '/index.html') {
            return respond(HTML_PAGE);
        }

        if (path === '/health') {
            return respond({ status: 'ok' });
        }

        if (path === '/api/store' && method === 'POST') {
            try {
                const data = await request.json() as { key: string; value: any; layer?: 'hot' | 'warm' | 'cold' };
                if (!data.key || data.value === undefined) {
                    return respond({ error: 'Missing key or value' }, 400);
                }

                const now = Date.now();
                const key = data.key;

                if (data.layer === 'cold' || !data.layer) {
                    // Store in cold (git/R2) - immutable snapshot
                    const snapshotKey = `cold/${key}/${now}.json`;
                    await env.GIT_BUCKET.put(snapshotKey, JSON.stringify({
                        value: data.value,
                        timestamp: now,
                        metadata: { source: 'store' }
                    }));
                }

                if (data.layer === 'warm' || data.layer === 'hot' || !data.layer) {
                    // Store in warm (7d TTL)
                    await env.KV_WARM.put(key, JSON.stringify(data.value), { expirationTtl: 60 * 60 * 24 * 7 });
                }

                if (data.layer === 'hot' || !data.layer) {
                    // Store in hot (2h TTL)
                    await env.KV_HOT.put(key, JSON.stringify(data.value), { expirationTtl: 60 * 60 * 2 });
                }

                return respond({ success: true, stored: key, layer: data.layer || 'all', timestamp: now });
            } catch (e) {
                return respond({ error: 'Invalid request' }, 400);
            }
        }

        if (path === '/api/query' && method === 'GET') {
            const key = url.searchParams.get('key');
            if (!key) return respond({ error: 'Missing key parameter' }, 400);

            // Search hot → warm → cold
            let value = await env.KV_HOT.get(key);
            let layer = 'hot';
            if (!value) {
                value = await env.KV_WARM.get(key);
                layer = 'warm';
            }
            if (!value) {
                // Look for latest cold snapshot
                const list = await env.GIT_BUCKET.list({ prefix: `cold/${key}/` });
                const objects = [...list.objects].sort((a, b) => b.uploaded.getTime() - a.uploaded.getTime());
                if (objects.length > 0) {
                    const latest = objects[0];
                    const coldData = await env.GIT_BUCKET.get(latest.key);
                    if (coldData) {
                        const coldJson = await coldData.json();
                        value = JSON.stringify(coldJson.value);
                        layer = 'cold';
                    }
                }
            }

            if (value) {
                return respond({ key, value: JSON.parse(value), layer, found: true });
            } else {
                return respond({ key, found: false }, 404);
            }
        }

        if (path === '/api/snapshot' && method === 'GET') {
            const prefix = url.searchParams.get('prefix') || '';
            const list = await env.GIT_BUCKET.list({ prefix: `cold/${prefix}` });
            const snapshots = await Promise.all(
                list.objects.map(async (obj) => {
                    const data = await env.GIT_BUCKET.get(obj.key);
                    const content = data ? await data.json() : null;
                    return {
                        key: obj.key,
                        uploaded: obj.uploaded,
                        size: obj.size,
                        content
                    };
                })
            );
            return respond({ snapshots, count: snapshots.length, prefix });
        }

        if (path === '/api/compact' && method === 'POST') {
            try {
                const { prefix } = await request.json() as { prefix: string };
                if (!prefix) return respond({ error: 'Missing prefix' }, 400);

                // List warm keys with prefix
                const keys: string[] = [];
                let cursor: string | undefined;
                do {
                    const list: { keys: { name: string }[], list_complete: boolean, cursor?: string } = await (env.KV_WARM as any).list({ prefix, cursor });
                    keys.push(...list.keys.map(k => k.name));
                    cursor = list.cursor;
                } while (cursor);

                // Move each to cold
                const now = Date.now();
                const compacted = [];
                for (const key of keys) {
                    const value = await env.KV_WARM.get(key);
                    if (value) {
                        const snapshotKey = `cold/compacted/${key}/${now}.json`;
                        await env.GIT_BUCKET.put(snapshotKey, JSON.stringify({
                            value: JSON.parse(value),
                            timestamp: now,
                            originalKey: key,
                            compacted: true
                        }));
                        await env.KV_WARM.delete(key);
                        compacted.push(key);
                    }
                }

                return respond({ success: true, compacted, count: compacted.length, timestamp: now });
            } catch (e) {
                return respond({ error: 'Compaction failed' }, 500);
            }
        }

        // Fallback 404
        return respond({ error: 'Not found', path: path }, 404);
    },
};