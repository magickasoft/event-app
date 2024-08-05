export function buildServerURL(serverUrl?: string): string {
  let url = serverUrl ?? '0.0.0.0:3000';
  url = url.includes('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}
