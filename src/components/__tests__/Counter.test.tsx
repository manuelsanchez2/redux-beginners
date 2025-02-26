import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, beforeEach } from "vitest";
import { setupCounterStore } from "../../tests/setupTestStore";
import Counter from "../Counter";

describe("Counter Component", () => {
    let store: ReturnType<typeof setupCounterStore>;

    beforeEach(() => {
        store = setupCounterStore({ counter: { value: 0 } }); // Initialize store with counter at 0
    });

    it("renders with initial value", () => {
        render(
            <Provider store={store}>
                <Counter />
            </Provider>
        );

        expect(screen.getByText("Counter: 0")).toBeInTheDocument();
    });

    it("increments the counter when '+' button is clicked", () => {
        render(
            <Provider store={store}>
                <Counter />
            </Provider>
        );

        const incrementButton = screen.getByText("+");
        fireEvent.click(incrementButton);

        expect(screen.getByText("Counter: 1")).toBeInTheDocument();
    });

    it("decrements the counter when '-' button is clicked", () => {
        store = setupCounterStore({ counter: { value: 1 } }); // Start with 1 so we can decrement
        render(
            <Provider store={store}>
                <Counter />
            </Provider>
        );

        const decrementButton = screen.getByText("-");
        fireEvent.click(decrementButton);

        expect(screen.getByText("Counter: 0")).toBeInTheDocument();
    });
});
