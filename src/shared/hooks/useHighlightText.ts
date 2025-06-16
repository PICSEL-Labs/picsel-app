export interface Props {
  text: string;
  highlight: boolean;
}

export const useHighlightText = (text: string): Props[] => {
  return text.split(/(\[.*?\])/g).map(part => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return { text: part.slice(1, -1), highlight: true };
    }
    return { text: part, highlight: false };
  });
};
