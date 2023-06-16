import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextField,
    DateField,
    MarkdownField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const CompteRenduShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Titre</Title>
            <TextField value={record?.titre} />
            <Title level={5}>Date Reunion</Title>
            <DateField value={record?.date_reunion} />
            <Title level={5}>Objectif</Title>
            <TextField value={record?.objectif} />
            <Title level={5}>Participants</Title>
            <MarkdownField value={record?.participants} />
            <Title level={5}>Emetteur</Title>
            <TextField value={record?.emetteur} />
            <Title level={5}>Date Modification</Title>
            <DateField value={record?.date_modification} />
        </Show>
    );
};
