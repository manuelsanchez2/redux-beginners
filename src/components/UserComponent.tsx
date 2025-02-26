import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, login, logout } from "../store/slices/userSlice";
import { AppDispatch, RootState } from "../store/store";
import "./UserComponent.css"; // Import the BEM-styled CSS

const UserComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoggedIn, name, status } = useSelector((state: RootState) => state.user);

    return (
        <div className="user">
            <h2 className="user__title">User Authentication</h2>
            <p className="user__status">Status: <strong>{status}</strong></p>

            {isLoggedIn ? (
                <div>
                    <p className="user__message">Welcome, {name || "User"}!</p>
                    <button 
                        className="user__button user__button--logout"
                        onClick={() => dispatch(logout())}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="user__buttons">
                    <button 
                        className="user__button user__button--login"
                        onClick={() => dispatch(login("Manual User"))}
                    >
                        Login Manually
                    </button>
                    <button 
                        className="user__button user__button--fetch"
                        onClick={() => dispatch(fetchUser())}
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Fetching..." : "Fetch User"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserComponent;
