import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function localDbPlugin() {
  const dbPath = path.resolve(__dirname, 'database.json')

  // Ensure database.json exists when program starts
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ score: 0, streaks: {} }, null, 2))
  }

  return {
    name: 'local-db',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === '/api/db') {
          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json')
            try {
              const data = fs.readFileSync(dbPath, 'utf8')
              res.end(data)
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Failed to read database' }))
            }
            return
          }
          if (req.method === 'POST') {
            let body = ''
            req.on('data', (chunk: any) => {
              body += chunk
            })
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body)
                fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2))
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true }))
              } catch (err) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Invalid JSON data' }))
              }
            })
            return
          }
        }
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localDbPlugin()],
})

