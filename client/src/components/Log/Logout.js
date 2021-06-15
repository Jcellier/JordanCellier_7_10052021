// Imports
import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  // fonction qui supprime le cookie
  const removeCookie = (key) => {
    if (window !== "undefined") {
      // on fait expirer le cookie a 1 milliseconde
      cookie.remove(key, { expires: 1 });
    }
  };

  // fonction qui permet de se déconnecter
  const logout = async () => {
    // methode get
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      // on supprime le cookie jwt
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    // on actualise la page
    window.location = "/";
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

// Export
export default Logout;
