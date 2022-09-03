import { useState } from "react";

const Replacer = function () {
  const [currentString, setCurrentString] = useState("");
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const onChange = function (s: string) {
    setCurrentString(s);
  };

  const render = function () {
    const uuidLength = 36;
    const matches: number[] = [];
    const newLineIndex: number[] = [];

    for (let i = 0; i < currentString.length - uuidLength + 1; i++) {
      if (currentString.substring(i, i + uuidLength).match(regex)) {
        matches.push(i);
      }
      if (currentString.charCodeAt(i) === 10) {
        newLineIndex.push(i);
      }
    }

    const renderedContent = [];
    let current = 0;
    let a = 0;
    let b = 0;
    while (a < matches.length || b < newLineIndex.length) {
      const nextMatch =
        a < matches.length ? matches[a] : Number.MAX_SAFE_INTEGER;
      const nextNewLine =
        b < newLineIndex.length ? newLineIndex[b] : Number.MAX_SAFE_INTEGER;
      const nextSignificant = Math.min(nextMatch, nextNewLine);

      if (current !== nextSignificant) {
        renderedContent.push(
          <span>{currentString.substring(current, nextSignificant)}</span>
        );
        current = nextSignificant;
        continue;
      }

      if (nextMatch === current) {
        renderedContent.push(
          <span className="bg-green-400">
            {currentString.substring(current, current + 36)}
          </span>
        );
        a++;
        current += 36;
      } else {
        renderedContent.push(<p />);
        b++;
        current += 1;
      }
    }

    if (current !== currentString.length) {
      renderedContent.push(
        <span>{currentString.substring(current, currentString.length)}</span>
      );
    }

    return renderedContent;
  };

  return (
    <div className="w-5/6">
      <div>
        <textarea
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-40 border-black border p-2 text-sm"
          placeholder="Enter your sql contents here"
        />
      </div>

      <div>
        Rendered Div
        <div className="w-full h-96 border-black border p-2 text-sm ">
          {render()}
        </div>
      </div>
    </div>
  );
};

export default Replacer;
