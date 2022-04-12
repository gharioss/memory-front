import React from "react";

function InfoProfile({ result }) {
  return (
    <tr>
      <td>{result.result}</td>
      <td>{result.date}</td>
    </tr>
  );
}

export default InfoProfile;
