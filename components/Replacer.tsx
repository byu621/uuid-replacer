import { useState } from "react";

const Replacer = function () {
  const [count, setCount] = useState(0);
  const [uuidCount, setUuidCount] = useState(0);
  const [currentString, setCurrentString] = useState("");

  const countUuid = function (s: string) {
    const uuidLength = 36;
    let matches = 0;
    const re =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    for (let i = 0; i < s.length - uuidLength + 1; i++) {
      const asdf = s.substring(i, i + uuidLength).match(re);
      if (asdf) {
        matches += 1;
      }
    }
    console.log(matches);
    setCurrentString(s);
  };

  return (
    <div className="w-1/2">
      <textarea
        onChange={(e) => countUuid(e.target.value)}
        className="w-full h-96 border-black border p-2"
        placeholder="Enter your sql contents here"
      />
      <div>Change Count: {count}</div>
      <div>UUID Count: {uuidCount}</div>
      <div>
        Current String: {currentString} {currentString.length}
      </div>
    </div>
  );
};

export default Replacer;
