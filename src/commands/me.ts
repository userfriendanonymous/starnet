import { command } from ".";

export const login = (name: string, password: string) =>
    command<null, Error>('login', {name, password})