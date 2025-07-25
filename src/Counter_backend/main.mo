// src/Counter_backend/main.mo

// This module defines a simple counter canister.

actor {
    // A stable variable to store the counter value.
    // 'stable' ensures that the value persists across canister upgrades.
    stable var counter: Nat = 0;

    // A public function to get the current value of the counter.
    // 'query' indicates that this function does not modify the canister's state,
    // making it cheaper and faster to call.
    public query func get() : async Nat {
        return counter;
    };

    // A public function to increment the counter.
    // This function modifies the canister's state.
    public func increment() : async Nat {
        counter += 1;
        return counter;
    };

    // A public function to reset the counter to zero.
    // This function modifies the canister's state.
    public func reset() : async Nat {
        counter := 0;
        return counter;
    };
}
