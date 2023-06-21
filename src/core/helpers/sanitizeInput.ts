export function sanitizeInputs(input: string) {
  return input.trim().toLowerCase().replaceAll('"', "");
}
