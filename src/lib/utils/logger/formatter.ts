import type { LogEntry } from './types';

export function formatLogEntry(entry: LogEntry): string {
  const timestamp = new Date(entry.timestamp).toLocaleString();
  const level = entry.level.toUpperCase().padEnd(5);
  
  let message = `[${timestamp}] ${level} ${entry.message}`;
  
  if (entry.data) {
    message += '\n' + JSON.stringify(entry.data, null, 2);
  }
  
  if (entry.error) {
    message += '\n' + entry.error.stack;
  }
  
  return message;
}

export function formatLogEntryHTML(entry: LogEntry): string {
  const timestamp = new Date(entry.timestamp).toLocaleString();
  const levelClass = `log-level-${entry.level}`;
  
  let html = `
    <div class="log-entry ${levelClass}">
      <span class="log-timestamp">${timestamp}</span>
      <span class="log-level">${entry.level.toUpperCase()}</span>
      <span class="log-message">${entry.message}</span>
  `;
  
  if (entry.data) {
    html += `
      <pre class="log-data">${JSON.stringify(entry.data, null, 2)}</pre>
    `;
  }
  
  if (entry.error) {
    html += `
      <pre class="log-error">${entry.error.stack}</pre>
    `;
  }
  
  html += '</div>';
  
  return html;
}