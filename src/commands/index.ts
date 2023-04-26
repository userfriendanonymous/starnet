import { resultifyPromise } from "@/result";
import { invoke } from "@tauri-apps/api";

export function command<T, E>(name: string, args?: any) {
    return resultifyPromise<T, E>( invoke(name, args) )
}