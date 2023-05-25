import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany, useList } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const AgendaList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: lieuData, isLoading: lieuIsLoading } = useMany({
        resource: "lieu",
        ids: tableProps?.dataSource?.map((item) => item?.lieu) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    const { data: statutData, isLoading: statutIsLoading } = useMany({
        resource: "statut",
        ids: tableProps?.dataSource?.map((item) => item?.statut) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    const { data: usersData, isLoading: usersIsLoading } = useList({
        resource: "users",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column
                    dataIndex={["debut"]}
                    title="Debut"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["fin"]}
                    title="Fin"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column dataIndex="titre" title="Titre" />
                <Table.Column dataIndex="objectif" title="Objectif" />
                <Table.Column
                    dataIndex={["statut"]}
                    title="Statut"
                    render={(value) =>
                        statutIsLoading ? (
                            <>Loading...</>
                        ) : (
                            `${statutData?.data?.find((item) => item.id === value)?.nom_statut}`
                        )
                    }
                />
                <Table.Column
                    dataIndex={["lieu"]}
                    title="Lieu"
                    render={(value) =>
                        lieuIsLoading ? (
                            <>Loading...</>
                        ) : (
                            `${lieuData?.data?.find((item) => item.id === value)?.nom_lieu}`
                        )
                    }
                />
                <Table.Column
                  dataIndex="emetteur"
                  title="Emetteur"
                  render={(value) =>
                    usersIsLoading ? (
                        <>Loading...</>
                    ) : (
                        `${usersData?.data?.find((item) => item.id === value)?.full_name}`
                    )
                    }
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};