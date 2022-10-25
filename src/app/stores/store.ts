import makeStore from "./makeStore";
import {createContext, useContext} from 'react'
import modelStore from "./modelStore";

interface Store{
    makeStore: makeStore
    modelStore: modelStore
}

export const store: Store={
    makeStore:new makeStore(),
    modelStore:new modelStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}