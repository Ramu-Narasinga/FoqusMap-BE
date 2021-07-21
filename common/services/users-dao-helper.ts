// password is hidden by default
export function getUserSelectable() {
    return {
        password: false,
        id: true,
        uuid: true,
        firstName: true,
        lastName: true,
        email: true,
        userSettings: true,
        tasks: true
    }
}