export const textToJSON = (text: string): any[] => {
  const parts: any[] = [];
  let index = 0;

  while (index < text.length) {
    const jsonStartIndex = text.indexOf("{", index);
    if (jsonStartIndex === -1) {
      parts.push(text.slice(index));
      break;
    }

    const jsonEndIndex = text.indexOf("}", jsonStartIndex);
    if (jsonEndIndex === -1) {
      parts.push(text.slice(index));
      break;
    }

    if (jsonStartIndex !== index) {
      parts.push(text.slice(index, jsonStartIndex));
    }

    parts.push(text.slice(jsonStartIndex, jsonEndIndex + 1));
    index = jsonEndIndex + 1;
  }

  return parts.map((part) => {
    try {
      const json = JSON.parse(part);
      return json;
    } catch (error) {
      return part;
    }
  });
};
