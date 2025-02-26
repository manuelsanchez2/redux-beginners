import { beforeEach, describe, expect, it } from "vitest";
import { server } from "../../tests/server";
import { Provider } from "react-redux";
import UserComponent from "../UserComponent";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { setupUserStore } from "../../tests/setupTestStore";

describe("UserComponent", () => {
    let store: ReturnType<typeof setupUserStore>;

    beforeEach(() => {
        store = setupUserStore({ user: { isLoggedIn: false, name: "", status: "idle" } });
        server.resetHandlers(); // Reset API mocks before each test
    });

    it("renders with initial state", async () => {
        render(
            <Provider store={store}>
                <UserComponent />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("Status:", { exact: false })).toBeInTheDocument();
        });

        expect(screen.getByText("Fetch User")).toBeInTheDocument();
    });

    it("logs in manually", () => {
        render(
            <Provider store={store}>
                <UserComponent />
            </Provider>
        );

        const loginButton = screen.getByText("Login Manually");
        fireEvent.click(loginButton);

        expect(screen.getByText("Welcome, Manual User!")).toBeInTheDocument();
    });

    it("logs out successfully", () => {
        store = setupUserStore({ user: { isLoggedIn: true, name: "Manual User", status: "idle" } });

        render(
            <Provider store={store}>
                <UserComponent />
            </Provider>
        );

        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);

        expect(screen.getByText("Fetch User")).toBeInTheDocument();
    });

    it("fetches user and updates UI", async () => {
        render(
            <Provider store={store}>
                <UserComponent />
            </Provider>
        );

        const fetchButton = screen.getByText("Fetch User");
        fireEvent.click(fetchButton);


        await waitFor(() => {
            expect(screen.getByText("Status:", { exact: false })).toHaveTextContent("loading");
        });

        await waitFor(() => {
            expect(screen.getByText((content) => content.includes("Welcome, Leanne Graham"))).toBeInTheDocument();
        });
    });
});