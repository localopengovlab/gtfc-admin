import { Show } from "@refinedev/antd";
import { Calendrier } from "../../components/calendar";

export const Home: React.FC = () => {
    return (
        <Show title="Tableau de bord">
            <Calendrier/>
        </Show>
    );
};