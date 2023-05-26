import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany, useList, useGetLocale } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
    getDefaultSortOrder,
    FilterDropdown,
    SaveButton
} from "@refinedev/antd";
import { Table, Space, Radio, Form, Input, Tag } from "antd";

export const AgendaList: React.FC<IResourceComponentsProps> = () => {

    const locale = useGetLocale();
    const currentLocale = locale();

    console.log(currentLocale);

    const { tableProps, sorter, searchFormProps } = useTable({
      syncWithLocation: true,
      sorters: {
        initial: [
          {
              field: "debut",
              order: "desc",
          },
        ],
      },
      onSearch: (values: any) => {
        return [
          {
            field: "titre",
            operator: "contains",
            value: values.titre,
          },
        ];
      },
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
          <Form {...searchFormProps} layout="inline">
              <Form.Item name="titre">
                  <Input placeholder="Rechercher par titre" />
              </Form.Item>
              <SaveButton onClick={searchFormProps.form?.submit} />
          </Form>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex={["debut"]}
                    title="Debut"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    render={(value: any) => <DateField value={value} locales={currentLocale} format="dddd DD MMMM YYYY - HH:mm" />}
                />
                <Table.Column
                    dataIndex={["fin"]}
                    title="Fin"
                    render={(value: any) => <DateField value={value} locales={currentLocale} format="dddd DD MMMM YYYY - HH:mm" />}
                />
                <Table.Column dataIndex="titre" title="Titre" />
                <Table.Column
                    dataIndex={["statut"]}
                    title="Statut"
                        render={(value) => {
                          const statut = statutData?.data?.find((item) => item.id === value)?.nom_statut;
                          const isLoading = statutIsLoading || !statutData;

                          let tagColor = "default";

                          if (statut === "confirme") {
                              tagColor = "success";
                          } else if (statut === "en attente") {
                              tagColor = "warning";
                          } else if (statut === "annule") {
                              tagColor = "error";
                          }

                          return (
                              <Tag color={tagColor}>
                                  {isLoading ? "Loading..." : statut}
                              </Tag>
                          );
                      }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="2">en attente</Radio>
                                <Radio value="1">confirme</Radio>
                                <Radio value="3">annule</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
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