import { useState } from "react";

const Replacer = function () {
  const ignored: string[] = [];
  ignored.push("06a441bf-a2da-4e02-b75a-4edf33458ea6");
  ignored.push("fa8ff9ae-c308-47c7-94f5-75fb6953c789");
  ignored.push("1ab20075-3153-4fcc-9eb2-a019c0048952");

  const colours: string[] = [
    "#9ca3af",
    "#f87171",
    "#fbbf24",
    "#a3e635",
    "#34d399",
    "#22d3ee",
    "#818cf8",
    "#e879f9",
    "#fb7185",
  ];
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
      const uuidString = currentString.substring(i, i + uuidLength);
      if (ignored.includes(uuidString)) continue;
      if (uuidString.match(regex)) {
        matches.push(i);
      }
      if (currentString.charCodeAt(i) === 10) {
        newLineIndex.push(i);
      }
    }

    const renderedContent = [];
    let colourIndex = 0;
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
        colourIndex = (colourIndex + 1) % colours.length;
        renderedContent.push(
          <span
            className="bg-green-400"
            style={{ backgroundColor: colours[colourIndex] }}
          >
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
        Ignored{" "}
        {ignored.map((e) => (
          <ul>{e}</ul>
        ))}
      </div>
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
