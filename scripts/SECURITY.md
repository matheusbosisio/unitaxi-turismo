# Manutenção da CSP

A configuração `vercel.json` aplica cabeçalhos defensivos na Vercel. Em outra hospedagem, replique esses headers. O site permanece público e indexável.

Os scripts inline são autorizados por hashes SHA-256 exatos, sem `unsafe-inline` em script-src. Ao editar um script inline (inclusive o WhatsApp no LRE ou JSON-LD), atualize o hash correspondente no vercel.json. Normalize CRLF para LF antes de calcular SHA-256/base64. Execute `node scripts/check-security.mjs` para verificar todos os hashes. O workflow executa essa checagem a cada alteração.

Estilos inline seguem permitidos para preservar o visual. Google Fonts/Analytics possuem apenas as permissões de rede usadas pelo site.
