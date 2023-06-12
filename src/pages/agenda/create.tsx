import React from "react";
import { IResourceComponentsProps, useGetIdentity } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select, InputNumber } from "antd";
import MDEditor from "@uiw/react-md-editor";
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