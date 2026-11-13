import React from "react";
import WorkspaceList from "../../Components/WorkspaceList/WorkspaceList";
import './HomeScreen.css'

function HomeScreen () {
    return (
        <div className="home">
            <main className="home__content">
                <h1 className="home__title">Bienvenido a Slack!</h1>
                <p className="home__subtitle">
                    Acá vas a encontrar tus espacios de trabajo, con sus
                    miembros y sus roles. Hacé clic en uno para entrar.
                </p>
                <WorkspaceList/>
            </main>
        </div>
    )
}

export default HomeScreen
