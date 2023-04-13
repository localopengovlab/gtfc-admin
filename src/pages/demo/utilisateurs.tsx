import { Show } from "@refinedev/antd";

export const Utilisateurs: React.FC = () => {
    return (
        <Show title="Utilisateurs">
            <img
                src={"/images/demo/user.png"}
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