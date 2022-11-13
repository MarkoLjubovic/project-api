import { CONNREFUSED } from "dns";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import makeAgent from "../api/makeAgent";
import { PageInfo } from "../models/pageinfo";
import { PageVehicleMake } from "../models/pagevehiclemake";
import { VehicleMake } from "../models/vehiclemake";

export default class makeStore {
    vehicleMake:VehicleMake={id:"",makeName:"",makeAbrv:""};
    vehicleMakes: VehicleMake[] = [];
    vehiclePageMakes: VehicleMake[] = [];
    pageVehicleMakes: PageVehicleMake[] = [{ items: this.vehicleMakes, filter: "", sortOrder: "", pgIndex: 0, numOfPages: 3 }];
    pageMakes:PageVehicleMake[]=[];
    pagingMake: { items: VehicleMake, filter: "", sortOrder: "", pgIndex: 0, numOfPages: 3 }[]
    =[{ items: this.vehicleMake, filter: "", sortOrder: "", pgIndex: 0, numOfPages: 3 }];
    pageInfo: PageInfo = { pgIndex: 0, filter: "", sortOrder: "" };
    selectedMake: VehicleMake | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadMakes = async () => {
        this.setLoadingInitial(true);
        try {
            const vehicleMakes = await makeAgent.VehicleMakes.list();
            vehicleMakes.forEach(vehicleMake => {
                this.setMake(vehicleMake);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadMake = async (id: string) => {
        let vehicleMake = this.getMake(id);
        if (vehicleMake) {
            this.selectedMake = vehicleMake;
            return vehicleMake;
        } else {
            this.loadingInitial = true;
            try {
                vehicleMake = await makeAgent.VehicleMakes.details(id);
                this.setMake(vehicleMake);
                runInAction(() => {
                    this.selectedMake = vehicleMake;
                })
                this.setLoadingInitial(false);
                return vehicleMake;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadPagingMakes = async () => {
        this.setLoadingInitial(true);
        try {
            const vehicleMakes = await makeAgent.VehicleMakes.paging(this.pageInfo);
            Object.values(vehicleMakes).forEach(vehicleMake => {
                console.log(vehicleMake);
                Object.values(vehicleMake).forEach(make=>{
                    // this.setMakeP(make);
                    this.vehiclePageMakes.push(make);
                    // console.log(make);
                    // console.log("ovo je",toJS(this.vehicleMake));
                });
                // this.pagingMake.push(vehicleMake);
                console.log("ovo je",toJS(this.vehiclePageMakes));
                //this.setPageMake(vehicleMake);
                //this.vehicleMake.id=vehicleMake;
                //this.pagingMake.items=vehicleMake;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    // async function setMakeP(vm:VehicleMake) {
    //     await this.vehicleMake=vm;
    // }

    setMakeP=(vm:VehicleMake)=>{
        this.vehicleMake=vm;
    }

    private setMake = (vehicleMake: VehicleMake) => {
        this.vehicleMakes.push(vehicleMake);
    }

    private setPageMake = (pageVehicleMake: PageVehicleMake) => {
        toJS(this.pageVehicleMakes.push(pageVehicleMake));
        console.log(this.pageVehicleMakes);
        console.log([...this.pageVehicleMakes]);
    }

    private getMake = (id: string) => {
        return this.vehicleMakes.find(m => m.id === id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createMake = async (vehicleMake: VehicleMake) => {
        this.loading = true;
        try {
            await makeAgent.VehicleMakes.create(vehicleMake);
            runInAction(() => {
                this.vehicleMakes.push(vehicleMake);
                this.selectedMake = vehicleMake;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateMake = async (vehicleMake: VehicleMake) => {
        this.loading = true;
        try {
            await makeAgent.VehicleMakes.update(vehicleMake);
            runInAction(() => {
                this.vehicleMakes = [...this.vehicleMakes.filter(x => x.id !== vehicleMake.id)];
                this.selectedMake = vehicleMake;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteMake = async (id: string) => {
        this.loading = true;
        try {
            await makeAgent.VehicleMakes.delete(id);
            runInAction(() => {
                this.vehicleMakes = [...this.vehicleMakes.filter(a => a.id !== id)];
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}