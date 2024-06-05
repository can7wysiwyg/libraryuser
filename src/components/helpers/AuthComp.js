import { logoutUser } from "./Logout"
import { usertoken } from "./UserToken";

export function AuthComp() {
  const checkAuth = () => {
    

    
    if (usertoken === null) {
      return (
        <>
          <a className="nav-link" href="/login">LOGIN</a>
        </>
      );
    }

    
    return (
      <>
        <a href="#c" className="nav-link" style={{ cursor: "pointer" }} onClick={logoutUser}>
          LOGOUT
        </a>
      </>
    );
  }

  return (
    <>
      {checkAuth()}
    </>
  );
}
