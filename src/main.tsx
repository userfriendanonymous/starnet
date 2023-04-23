import { enableMapSet } from "immer"
import React from "react"
import ReactDOM from "react-dom/client"
import App from './app'
import './index.css'

enableMapSet()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
