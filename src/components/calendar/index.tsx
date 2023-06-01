import { useState } from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar,  Col, Row, Select } from 'antd';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import { useList, useGetLocale } from "@refinedev/core";
import dayjs from 'dayjs';

dayjs.extend(dayLocaleData);

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

const useFetchAgendaData = (selectedValue: Dayjs) => {
  const { data: agendaData } = useList({
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
        value: selectedValue.startOf('month'),
      },
    ],
  });

  return agendaData?.data || [];
};

export const Calendrier: React.FC = () => {

  const locale = useGetLocale();
  const currentLocale = locale() || 'fr';

  const localeCalendare: PickerLocale = {
  lang: {
    locale: currentLocale,
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    today: 'Today',
    now: 'Now',
    backToToday: 'Back to today',
    ok: 'OK',
    clear: 'Clear',
    month: 'Month',
    year: 'Year',
    timeSelect: 'Select time',
    dateSelect: 'Select date',
    monthSelect: 'Choose a month',
    yearSelect: 'Choose a year',
    decadeSelect: 'Choose a decade',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Previous month (PageUp)',
    nextMonth: 'Next month (PageDown)',
    previousYear: 'Last year (Control + left)',
    nextYear: 'Next year (Control + right)',
    previousDecade: 'Last decade',
    nextDecade: 'Next decade',
    previousCentury: 'Last century',
    nextCentury: 'Next century',
  },
  timePickerLocale: {
    placeholder: 'Select time',
  },
};

  const [currentDate, setCurrentDate] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const agendaData = useFetchAgendaData(selectedValue);

  const onPanelChange = (newValue: Dayjs) => {
    setCurrentDate(newValue);
    setSelectedValue(newValue);
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(
      agendaData.filter(
        (item: any) => 
          dayjs(item.debut).date() === value.date() &&
          dayjs(item.debut).month() === value.month()
      )
    );
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
    return info.originNode;
  };

  return <Calendar
    locale={localeCalendare}
    value={currentDate}
    cellRender={cellRender}
    onPanelChange={onPanelChange}
    mode='month'
    headerRender={({ value, onChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const localeData = value.localeData();
          const months = localeData.monthsShort();

          const monthsInFrench = months.map((month, index) =>
            dayjs().locale(currentLocale).month(index).format('MMMM')
          );

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {monthsInFrench[i]}
              </Select.Option>,
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }
          return (
              <Row justify="end" gutter={8}>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
          );
        }}
    />;
};