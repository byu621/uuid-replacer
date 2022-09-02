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

    for (let i = 0; i < currentString.length - uuidLength + 1; i++) {
      const asdf = currentString.substring(i, i + uuidLength).match(regex);
      if (asdf) {
        matches.push(i);
      }
    }

    const renderedContent = [];
    if (matches[0] !== 0) {
      renderedContent.push(
        <span>{currentString.substring(0, matches[0])}</span>
      );
    }
    for (let i = 0; i < matches.length; i++) {
      renderedContent.push(
        <span className="bg-green-600">
          {currentString.substring(matches[i], matches[i] + uuidLength)}
        </span>
      );

      if (matches[i] + uuidLength == currentString.length) break;
      if (matches[i] + uuidLength < currentString.length) {
        let endIndex = -1;
        if (i + 1 < matches.length) {
          endIndex = matches[i + 1];
        } else {
          endIndex = currentString.length;
        }
        renderedContent.push(
          <span>
            {currentString.substring(matches[i] + uuidLength, endIndex)}
          </span>
        );
      }
    }
    return <div>{renderedContent}</div>;
  };

  return (
    <div className="w-1/2">
      <div>
        <textarea
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-96 border-black border p-2"
          placeholder="Enter your sql contents here"
        />
      </div>

      <div>
        Rendered Div
        <div className="w-full h-96 border-black border p-2">{render()}</div>
      </div>
    </div>
  );
};

export default Replacer;
