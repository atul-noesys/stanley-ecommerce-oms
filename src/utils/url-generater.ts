export function makeUrlFromCategoryName(input: string): string {
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

export function getCategoryNameFromUrl(input: string): string {
  if (!input) return input;

  return (
    input
      // Split by hyphens
      .split("-")
      // Capitalize the first letter of each word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      // Join with spaces
      .join(" ")
  );
}
