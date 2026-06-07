import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_SERVER_URL;

  const handleLogout = async () => {
    try {
      await axios.post(apiUrl + "/logout", {}, { withCredentials: true });
      navigate("/login");
      dispatch(removeUser());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm py-3">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl capitalize">
            👨🏻‍💻 DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex-1 justify-center">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}

        {user && (
          <div className="flex items-center gap-4">
            <h5 className="capitalize font-semibold">
              Welcome {user?.firstName}
            </h5>

            <div className="dropdown dropdown-end mx-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="UserImage" src={user?.photoUrl} />
                </div>
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>

                <li>
                  <Link to="/connections">Connections</Link>
                </li>

                <li>
                  <Link to="/requests">Requests</Link>
                </li>

                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
