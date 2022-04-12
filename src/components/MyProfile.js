import axios from "axios";
import React, { useEffect, useState } from "react";
import InfoProfile from "./InfoProfile";

function MyProfile() {
  const [myProfile, setMyProfile] = useState([]);
  const data = {
    token: localStorage.getItem("token"),
  };
  useEffect(() => {
    axios
      .post("myProfile.php", data)
      .then((res) => {
        setMyProfile([res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="auth-inner">
      <h1>My Profile</h1>
      <p>
        {myProfile.length > 0
          ? myProfile[0][0].first_name + "  " + myProfile[0][0].last_name
          : null}
      </p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Résultat</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {myProfile.length > 0
            ? myProfile[0].map((result, key) => (
                <InfoProfile result={result} key={key} />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default MyProfile;
