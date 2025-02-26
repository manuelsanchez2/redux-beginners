import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useLazyFetchUserQuery } from "../store/api/userApi";
import "./UserComponent.css";
import { login, logout } from "../store/slices/userSliceWithCreateAPI";

const UserComponentWithCreateAPI: React.FC = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, user, status, error } = useSelector((state: RootState) => state.userCreateAPI);


    const [fetchUser, { isFetching }] = useLazyFetchUserQuery();

    return (
        <div className="user">
            <h2 className="user__title">User Authentication</h2>
            <p className="user__status">Status: <strong>{status}</strong></p>

            {error && <p className="user__error">Error: {error}</p>}

            {isLoggedIn ? (
                <div>
                    <p className="user__message">
                        Welcome, <strong>{user?.name || "User"}</strong>!
                    </p>
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
                        onClick={() => fetchUser()} // ✅ Trigger API call on demand
                        disabled={isFetching}
                    >
                        {isFetching ? "Fetching..." : "Fetch User"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserComponentWithCreateAPI;
