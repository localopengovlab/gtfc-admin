import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import { useList } from "@refinedev/core";
import dayjs from 'dayjs';

const getListData = (value: any) => {
  let listData;

  listData = value?.map((event:any)=>{
    let tagColor = "default";

    if (event.statut === 1) {
        tagColor = "success";
    } else if (event.statut === 2) {
        tagColor = "warning";
    } else if (event.statut === 3) {
        tagColor = "error";
    }
    return { type: tagColor, content: event.titre }
  });

  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export const Calendrier: React.FC = () => {
  const { data: agendaData, isLoading: agendaIsLoading } = useList({
    resource: "agenda",
    sorters: [
      {
        field: "debut",
        order: "desc",
      },
    ],
    filters: [
      {
        field: "statut",
        operator: "eq",
        value: 1,
      },
      {
        field: "debut",
        operator: "gt",
        value: dayjs().startOf('month'),
      },
    ],
  });

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(agendaData?.data?.filter((item: any) => dayjs(item.debut).date() === value.date()));
    return (
      <ul className="events" style={{listStyle:"none",padding:0}}>
        {listData.map((item: any) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};