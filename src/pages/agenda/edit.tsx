import React from "react";
import { IResourceComponentsProps, useOne } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";

export const AgendaEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const agendaData = queryResult?.data?.data;

    const { selectProps: lieuSelectProps } = useSelect({
        resource: "lieu",
        optionLabel: "nom_lieu",
        defaultValue: agendaData?.lieu,
    });

    const { selectProps: statutSelectProps } = useSelect({
        resource: "statut",
        optionLabel: "nom_statut",
        defaultValue: agendaData?.statut,
    });

    const {data: emetteurData, isLoading: emetteurIsLoading} = useOne({
      resource: "users",
      id: agendaData?.emetteur
    })

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Id"
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || !getFieldValue("fin")) {
                              return Promise.resolve();
                            }
                            if (dayjs(value).isBefore(getFieldValue("fin"))) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("La date de début doit être plus petite que la date de fin.")
                            );
                          },
                        }),
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                    label="Debut"
                    name={["debut"]}
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || !getFieldValue("debut")) {
                              return Promise.resolve();
                            }
                            if (dayjs(value).isAfter(getFieldValue("debut"))) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("La date de fin doit être plus grande que la date de début.")
                            );
                          },
                        }),
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item
                    label="Fin"
                    name={["fin"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item
                    label="Titre"
                    name={["titre"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Objectif"
                    name={["objectif"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Statut"
                    name={"statut"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...statutSelectProps} />
                </Form.Item>
                <Form.Item
                    label="Lieu"
                    name={"lieu"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...lieuSelectProps} />
                </Form.Item>
                <Form.Item
                    label="Pour Info"
                    name={["pour_info"]}
                >
                    <MDEditor/>
                </Form.Item>
                <Form.Item
                    label="Nombre Participant"
                    name={["nombre_participant"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Animateur"
                    name={["animateur"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={emetteurIsLoading ? <>Loading...</> : <>Emetteur: {emetteurData?.data?.full_name}</>}
                    name={["emetteur"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Date Modification"
                    name={["date_modification"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker showTime disabled/>
                </Form.Item>
            </Form>
        </Edit>
    );
};
