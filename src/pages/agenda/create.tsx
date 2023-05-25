import React from "react";
import { IResourceComponentsProps, useGetIdentity } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select, InputNumber } from "antd";
import dayjs from "dayjs";

type IUser = {
  id: number;
  user_metadata: {
    full_name: string;
  };
};

export const AgendaCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, onFinish } = useForm({

    });

    const { selectProps: lieuSelectProps } = useSelect({
        resource: "lieu",
        optionLabel: "nom_lieu",
    });

    const { data: user } = useGetIdentity<IUser>();

    const handleOnFinish = (values: any) => {
        onFinish({
            ...values,
            statut: 2,
            emetteur: user?.id
        });
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
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
                    <InputNumber min={2} max={50} />
                </Form.Item>
                <Form.Item
                    label="Animateur"
                    name={["animateur"]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};