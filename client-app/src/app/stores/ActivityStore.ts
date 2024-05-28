import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../Models/Activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    loadingInitial: boolean = true;
    editMode: boolean = false;
    loading: boolean = false;
    selectActivity: Activity | undefined = undefined;
    activityRegistry = new Map<string, Activity>();

    constructor() {
        makeAutoObservable(this)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            const activities = (await agent.Activities.list()).data;
            activities.forEach((activity: Activity) => {
                if (activity.date !== undefined)
                    activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);

            });
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }

    }

    selectedActivity = (Id: string) => {
        const activity = this.activityRegistry.get(Id);
        this.selectActivity = activity
    }

    handleCancelActivity = () => {
        this.selectActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectedActivity(id) : this.handleCancelActivity;
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        activity.id = uuid();
        this.loading = true;
        try {
            this.activityRegistry.set(activity.id, activity);
            await agent.Activities.create(activity);
            runInAction(() => {
                this.editMode = false;
                this.selectActivity = activity;
                this.loading = false;
            })

        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.editMode = false;
                this.selectActivity = activity;
                this.loading = false;
            })
        }

    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.editMode = false;
                this.selectActivity = activity;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.editMode = false;
                this.selectActivity = activity;
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.loading = false;
                this.activityRegistry.delete(id);
                if (this.selectActivity?.id === id)
                    this.handleCancelActivity();
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
                console.log(error);
            })
        }
    }


}

