export function formatStringEnhanced(input: string): string {
  if (!input) return input;

  return (
    input
      // Insert hyphen between camelCase
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // Replace spaces and underscores with hyphen
      .replace(/[\s_]+/g, "-")
      // Lowercase everything
      .toLowerCase()
  );
}
