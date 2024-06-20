import { makeAutoObservable, reaction } from "mobx";
import { serverError } from "../Models/serverError";

export default class CommonStore {

    errors: serverError | null = null;
    token: string | null = localStorage.getItem("jwt");
    appLoaded: boolean = false;
    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem("jwt", token);
                }
                else {
                    localStorage.removeItem("jwt");
                }
            }
        );
    }

    setErrors = (err: serverError) => {
        this.errors = err;
    }

    setToken = (token: string | null | undefined) => {
        if (token) {
            this.token = token;
        }
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}