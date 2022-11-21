import UserInterface from "./user";

export default interface LoginInterface {
    user: UserInterface,
    token: string,
    success: boolean,
    message: string
};