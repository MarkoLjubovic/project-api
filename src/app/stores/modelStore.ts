import { makeAutoObservable, runInAction} from "mobx";
import modelAgent from "../api/modelAgent";
import { VehicleModel } from "../models/vehiclemodel";

export default class modelStore {
    vehicleModels: VehicleModel[] = [];
    selectedModel: VehicleModel | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadModels = async () => {
        this.setLoadingInitial(true);
        try {
            const vehicleModels = await modelAgent.VehicleModels.list();
            vehicleModels.forEach(vehicleModel => {
                this.setModel(vehicleModel);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadModel=async(id:string)=>{
        let vehicleModel=this.getModel(id);
        if(vehicleModel){
            this.selectedModel=vehicleModel;
            return vehicleModel;
        }else{
            this.loadingInitial=true;
            try{
                vehicleModel=await modelAgent.VehicleModels.details(id);
                this.setModel(vehicleModel);
                runInAction(()=>{
                    this.selectedModel=vehicleModel;
                })
                this.setLoadingInitial(false);
                return vehicleModel;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setModel=(vehicleModel:VehicleModel)=>{
        this.vehicleModels.push(vehicleModel);
    }

    private getModel=(id:string)=>{
        return this.vehicleModels.find(m=>m.id===id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createModel=async(vehicleModel:VehicleModel)=>{
        this.loading=true;
        try{
            await modelAgent.VehicleModels.create(vehicleModel);
            runInAction(()=>{
                this.vehicleModels.push(vehicleModel);
                this.selectedModel=vehicleModel;
                this.editMode=false;
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    updateModel=async(vehicleModel:VehicleModel)=>{
        this.loading=true;
        try{
            await modelAgent.VehicleModels.update(vehicleModel);
            runInAction(()=>{
                this.vehicleModels=[...this.vehicleModels.filter(x=>x.id!==vehicleModel.id)];
                this.selectedModel=vehicleModel;
                this.editMode=false;
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    deleteModel=async(id:string)=>{
        this.loading=true;
        try{
            await modelAgent.VehicleModels.delete(id);
            runInAction(()=>{
                this.vehicleModels=[...this.vehicleModels.filter(a=>a.id!==id)];
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}