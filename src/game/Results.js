import axios from "axios";
import React, { useEffect, useState } from "react";
import Result from "./Result";

function Results() {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    axios
      .get("getResult.php")
      .then((res) => {
        setInfos([res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3 align="center">Meilleurs Résultats!</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Résultat</th>
            <th>Date</th>
            <th>Prénom</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {infos.length > 0
            ? infos[0].map((result, key) => (
                <Result result={result} key={key} />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
