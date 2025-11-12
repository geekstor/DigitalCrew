/**
 * Flattens nested translation objects into dot-notation keys
 * Example: { common: { app: { title: 'Test' } } } => { 'common.app.title': 'Test' }
 */
export function flattenMessages(
  nestedMessages: Record<string, any>,
  prefix = ''
): Record<string, string> {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {} as Record<string, string>);
}
