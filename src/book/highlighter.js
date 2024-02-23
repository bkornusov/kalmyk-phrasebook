export default function highlight(string, highlights) {
  if (!highlights || highlights.length === 0) {
    return string;
  }

  let result = string;

  const reds = highlights.red;
  const blues = highlights.blue;

  if (reds) {
    reds.forEach((redString) => {
      if (typeof redString === "string") {
        var regex = new RegExp(redString, `g`);
        result = result.replaceAll(
          regex,
          `<span style="color: red;">${redString}</span>`
        );
      } else {
        var word = redString.word;
        var substring = redString.substring;
        var regex = new RegExp(word, "gi");
        if (substring === "end") {
          result = result.replace(
            regex,
            `${word.slice(
              0,
              word.length - 1
            )}<span style="color: red;">${word.slice(word.length - 1)}</span>`
          );
        } else {
          var location = word.indexOf(substring);
          result = result.replaceAll(
            regex,
            `${word.slice(
              0,
              location
            )}<span style="color: red;">${substring}</span>${word.slice(
              location + substring.length
            )}`
          );
        }
      }
    });
  }

  if (blues) {
    blues.forEach((blueString) => {
      if (typeof blueString === "string") {
        var regex = new RegExp(blueString, `gi`);
        result = result.replaceAll(
          regex,
          `<span style="color: DodgerBlue;">${blueString}</span>`
        );
      } else {
        var word = blueString.word;
        var substring = blueString.substring;
        var regex = new RegExp(word, "gi");
        if (substring === "end") {
          result = result.replace(
            regex,
            `${word.slice(
              0,
              word.length - 1
            )}<span style="color: DodgerBlue;">${word.slice(
              word.length - 1
            )}</span>`
          );
        } else {
          var location = word.indexOf(substring);
          result = result.replace(
            regex,
            `${word.slice(
              0,
              location
            )}<span style="color: DodgerBlue;">${substring}</span>${word.slice(
              location + substring.length
            )}`
          );
        }
      }
    });
  }

  return <text dangerouslySetInnerHTML={{ __html: result }}></text>;
}

// export default function highlight(string, highlights) {
//   if (!highlights || highlights.length === 0) {
//     return string;
//   }

//   let result = string;

//   const reds = highlights.red;
//   const blues = highlights.blue;

//   if (reds) {
//     reds.forEach((substring) => {
//       var regex;
//       if (substring.length === 1) {
//         regex = new RegExp(
//           `(${substring}|\\b\\w${substring.charAt(
//             substring.length - 1
//           )})([!?,.])`,
//           "g"
//         );
//         result = result.replace(
//           regex,
//           (match, p1, p2) => `<span style="color: red;">${p1}</span>${p2}`
//         );
//       } else {
//         regex = new RegExp(substring, "g");
//         result = result.replace(
//           regex,
//           `<span style="color: red;">${substring}</span>`
//         );
//       }
//     });
//   }

//   if (blues) {
//     blues.forEach((substring) => {
//       const regex = new RegExp(substring, "g");
//       result = result.replace(
//         regex,
//         `<span style="color: DodgerBlue;">${substring}</span>`
//       );
//     });
//   }

//   return <text dangerouslySetInnerHTML={{ __html: result }}></text>;
// }
