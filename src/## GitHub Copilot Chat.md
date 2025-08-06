## GitHub Copilot Chat

- Extension Version: 0.29.1 (prod)
- VS Code: vscode/1.102.2
- OS: Mac

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 140.82.116.6 (16 ms)
- DNS ipv6 Lookup: ::ffff:140.82.116.6 (45 ms)
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 200 (167 ms)
- Node.js https: HTTP 200 (101 ms)
- Node.js fetch: HTTP 200 (114 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.112.21 (17 ms)
- DNS ipv6 Lookup: ::ffff:140.82.112.21 (1 ms)
- Proxy URL: None (6 ms)
- Electron fetch (configured): HTTP 200 (384 ms)
- Node.js https: HTTP 200 (259 ms)
- Node.js fetch: HTTP 200 (279 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).