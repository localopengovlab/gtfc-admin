import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
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
                    <Input />
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
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Emetteur"
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
