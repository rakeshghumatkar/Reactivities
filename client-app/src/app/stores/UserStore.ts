import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { User, UserFormValue } from '../Models/user';
import agent from '../api/agent';
import { store } from './store';
import { router } from '../router/Routes';

export default class UserStore {
    user: User | null | any = null;

    constructor() {
        makeAutoObservable(this)

    }
    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValue) => {

        var user = (await agent.Account.login(creds)).data;
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        router.navigate("/activities");
        console.log(user);

    }
    logout = async () => {
        store.commonStore.setToken(null);
        localStorage.removeItem("jwt")
        this.user = null;
        router.navigate("/");
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }


}