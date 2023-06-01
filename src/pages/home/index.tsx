import { List } from "@refinedev/antd";
import { Card } from 'antd';
import { Calendrier } from "../../components/calendar";

export const Home: React.FC = () => {
  return (
    <List title="Tableau de bord">
      <Card>
        <Calendrier/>
      </Card>
    </List>
  );
};