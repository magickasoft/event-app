export function buildServerURL(serverUrl?: string): string {
  let url = serverUrl ?? 'http://localhost:8000/';
  url = url.includes('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}
