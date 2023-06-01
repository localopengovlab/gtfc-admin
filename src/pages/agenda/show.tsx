import React from "react";
import { IResourceComponentsProps, useShow, useOne, useGetLocale } from "@refinedev/core";
import {
    Show,
    NumberField,
    DateField,
    TextField,
    MarkdownField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const AgendaShow: React.FC<IResourceComponentsProps> = () => {

  const locale = useGetLocale();
  const currentLocale = locale();

  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: lieuData, isLoading: lieuIsLoading } = useOne({
    resource: "lieu",
    id: record?.lieu || "",
    queryOptions: {
        enabled: !!record,
    },
  });

  const { data: statutData, isLoading: statutIsLoading } = useOne({
    resource: "statut",
    id: record?.statut || 0,
    queryOptions: {
        enabled: !!record,
    },
  });

  const {data: emetteurData, isLoading: emetteurIsLoading} = useOne({
    resource: "users",
    id: record?.emetteur
  })

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Debut</Title>
      <DateField value={record?.debut} locales={currentLocale} format="dddd DD MMMM YYYY - HH:mm" />
      <Title level={5}>Fin</Title>
      <DateField value={record?.fin} locales={currentLocale} format="dddd DD MMMM YYYY - HH:mm" />
      <Title level={5}>Titre</Title>
      <TextField value={record?.titre} />
      <Title level={5}>Objectif</Title>
      <TextField value={record?.objectif} />
      <Title level={5}>Statut</Title>
      {statutIsLoading ? <>Loading...</> : <>{statutData?.data?.nom_statut}</>}
      <Title level={5}>Lieu</Title>
      {lieuIsLoading ? <>Loading...</> : <>{lieuData?.data?.nom_lieu}</>}
      <Title level={5}>Pour Info</Title>
      <MarkdownField value={record?.pour_info} />
      <Title level={5}>Nombre Participant</Title>
      <NumberField value={record?.nombre_participant ?? ""} />
      <Title level={5}>Date Modification</Title>
      <DateField value={record?.date_modification} />
      <Title level={5}>Animateur</Title>
      <TextField value={record?.animateur} />
      <Title level={5}>Emetteur</Title>
      {emetteurIsLoading ? <>Loading...</> : <>{emetteurData?.data?.full_name}</>}
    </Show>
  );
};