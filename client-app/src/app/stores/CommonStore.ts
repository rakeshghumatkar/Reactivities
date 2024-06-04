import { makeAutoObservable } from "mobx";
import { serverError } from "../Models/serverError";

export default class CommonStore {

    errors: serverError | null = null;
    constructor() {
        makeAutoObservable(this)
    }

    setErrors = (err: serverError) => {
        this.errors = err;
    }
}