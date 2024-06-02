export function buildServerURL(serverUrl?: string): string {
  let url = serverUrl ?? 'http://158.160.158.243:8000/';
  url = url.includes('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}
