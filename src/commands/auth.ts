import { invoke } from "@tauri-apps/api";
import { resultifyPromise } from '@/result';

export function login(name: string, password: string) {
    return resultifyPromise<null, Error>( invoke('login', {name, password}) )
}