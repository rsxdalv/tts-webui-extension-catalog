// JSON syntax highlighting with spans
export function formatJson(obj: any): string {
  const jsonString = JSON.stringify(obj, null, 2);
  const lines = jsonString.split("\n");
  const formattedLines = lines.map((line) => {
    // Key highlighting (before colon)
    line = line.replace(
      /"([^"]*)"(\s*:\s*)/g,
      '<span style="color: #259addff;">"$1"</span>$2',
    );
    // String value highlighting
    line = line.replace(
      /:\s*"([^"]*)"([,\s]*$)/g,
      ': <span style="color: #ecb234ff;">"$1"</span>$2',
    );
    // Number highlighting
    line = line.replace(
      /:\s*(-?\d+\.?\d*)([,\s]*$)/g,
      ': <span style="color: #21f3b4ff;">$1</span>$2',
    );
    // Boolean/null highlighting
    line = line.replace(
      /:\s*(true|false|null)([,\s]*$)/g,
      ': <span style="color: #ff9800;">$1</span>$2',
    );
    return line;
  });
  return formattedLines.join("\n");
}
