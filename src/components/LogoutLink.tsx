import { logoutUser } from "actions";
import { UserState } from "types";

export const LogoutLink = ({
  setUser,
}: {
  setUser: UserState["setUser"];
}): JSX.Element => (
  <button
    onClick={() => {
      logoutUser();
      setUser(null);
    }}
    className="btn btn-primary btn-sm navbar-btn"
  >
    Log out
  </button>
);
