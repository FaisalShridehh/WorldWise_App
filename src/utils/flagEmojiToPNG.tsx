import React from "react";

// * for Flag to emoji converter
const flagEmojiToPNG = (flag: string | undefined): React.JSX.Element | null => {
  if (!flag || flag.length === 0) return null;

  const countryCode = Array.from(flag, (codeUnit) => {
    const codePoint = codeUnit.codePointAt(0);
    return codePoint !== undefined
      ? String.fromCharCode(codePoint - 127397).toLowerCase()
      : "";
  }).join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

export default flagEmojiToPNG;
