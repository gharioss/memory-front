import React, { useEffect, useState } from "react";

function Result({ result }) {
  return (
    <tr>
      <td>{result.result}</td>
      <td>{result.dateE}</td>
      <td>{result.first_name}</td>
      <td>{result.last_name}</td>
    </tr>
  );
}

export default Result;
