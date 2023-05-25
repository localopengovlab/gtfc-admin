import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    EmailField
} from "@refinedev/antd";
import { Table, Space, Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const UtilisateurList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: bureauData, isLoading: bureauIsLoading } = useMany({
        resource: "bureau",
        ids: tableProps?.dataSource?.map((item) => item?.bureau) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex={["avatar_url"]}
                    title="Avatar"
                    render={(value: any) => (
                      <Avatar
                        icon={<UserOutlined />}
                        src={value}
                        size={{ xs: 24, sm: 32, md: 40 }}
                      />
                    )}
                />
                <Table.Column dataIndex="full_name" title="Prénom Nom" />
                <Table.Column
                    dataIndex={["email"]}
                    title="Email"
                    render={(value: any) => <EmailField value={value} />}
                />
                <Table.Column
                    dataIndex={["bureau"]}
                    title="Bureau"
                    render={(value) =>
                        bureauIsLoading ? (
                            <>Loading...</>
                        ) : (
                            `${bureauData?.data?.find((item) => item.id === value)?.nom_bureau}`
                        )
                    }
                />
                <Table.Column 
                  dataIndex="role"
                  title="Rôle"
                  render={(value: any) => <Tag
                      color={(value==="admin")?"error" : "default" }
                      style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                      }}
                    >
                      {value}
                    </Tag>
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
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
