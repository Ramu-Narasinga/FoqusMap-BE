"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSelectable = void 0;
// password is hidden by default
function getUserSelectable() {
    return {
        password: false,
        id: true,
        uuid: true,
        firstName: true,
        lastName: true,
        email: true,
        userSettings: true,
        tasks: true
    };
}
exports.getUserSelectable = getUserSelectable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtZGFvLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91c2Vycy1kYW8taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdDQUFnQztBQUNoQyxTQUFnQixpQkFBaUI7SUFDN0IsT0FBTztRQUNILFFBQVEsRUFBRSxLQUFLO1FBQ2YsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxJQUFJO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsSUFBSTtRQUNYLFlBQVksRUFBRSxJQUFJO1FBQ2xCLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQTtBQUNMLENBQUM7QUFYRCw4Q0FXQyJ9