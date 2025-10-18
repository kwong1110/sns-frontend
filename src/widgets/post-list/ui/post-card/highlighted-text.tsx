interface HighlightedTextProps {
  text: string;
}

export function HighlightedText({ text }: HighlightedTextProps) {
  const parts = text.split(/(\s+)/);

  return (
    <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-foreground">
      {parts.map((part, index) => {
        // 해시태그
        if (part.startsWith("#")) {
          return (
            <span
              key={index}
              className="font-medium text-blue-500 hover:underline"
            >
              {part}
            </span>
          );
        }

        // URL
        if (part.match(/^https?:\/\//)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}
