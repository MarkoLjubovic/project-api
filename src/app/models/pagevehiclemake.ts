import { VehicleMake } from "./vehiclemake";

export interface PageVehicleMake{
    items: VehicleMake[];
    filter: string;
    sortOrder: string;
    pgIndex: number;
    numOfPages: number;
}