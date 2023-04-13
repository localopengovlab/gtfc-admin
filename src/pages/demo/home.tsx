import { Show } from "@refinedev/antd";

export const Home: React.FC = () => {
    return (
        <Show title="Tableau de bord">
            <img
                src={"/images/demo/home.png"}
                alt="Gueule Tapée - Fass - Colobane Admin"
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            />
        </Show>
    );
};