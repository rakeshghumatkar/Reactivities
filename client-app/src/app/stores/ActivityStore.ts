import { keys, makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { Activity } from "../Models/Activity";

export default class ActivityStore {
    loadingInitial: boolean = false;
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

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                if (date)
                    activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }

    loadActivities = async () => {
        try {
            const activities = (await agent.Activities.list()).data;
            activities.forEach((activity: Activity) => {
                this.setActivity(activity);
            });
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }

    }

    setActivity = (activity: Activity) => {
        if (activity.date !== undefined)
            activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    loadActivity = async (Id: string) => {
        let activity = this.getActivity(Id);

        if (activity !== undefined) {
            this.selectActivity = activity;
            return activity;
        }
        else {
            this.setLoadingInitial(true)
            try {
                activity = (await agent.Activities.details(Id)).data;
                this.setActivity(activity);
                runInAction(() => this.selectActivity = activity)
                this.setLoadingInitial(false)
                return activity;
            } catch (error) {
                this.setLoadingInitial(false);
                console.log(error);
            }
        }

    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    selectedActivity = (Id: string) => {
        const activity = this.activityRegistry.get(Id);
        this.selectActivity = activity
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
                    this.selectActivity = undefined;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
                console.log(error);
            })
        }
    }


}


