import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const CompteRenduList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List canCreate={false}>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="titre" title="Titre" />
                <Table.Column
                    dataIndex={["date_reunion"]}
                    title="Date Reunion"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column dataIndex="objectif" title="Objectif" />
                <Table.Column dataIndex="participants" title="Participants" />
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
