import parse from 'html-react-parser';

export const HtmlParse = ({ stringifyHTML }: { stringifyHTML: string }) => {
  return parse(stringifyHTML)
}
