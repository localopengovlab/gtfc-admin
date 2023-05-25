import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";

export const UtilisateurEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const utilisateursData = queryResult?.data?.data;

    const { selectProps: bureauSelectProps } = useSelect({
        resource: "bureau",
        optionLabel: "nom_bureau",
        defaultValue: utilisateursData?.bureau,
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
                    label="Prénom Nom"
                    name={["full_name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={["email"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Bureau"
                    name={"bureau"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...bureauSelectProps} />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name={["role"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                      options={[
                        { value: 'admin', label: 'admin' },
                        { value: 'editeur', label: 'editeur' }
                      ]}
                    />
                </Form.Item>
                <Form.Item label="Avatar">
                    <Form.Item
                        name="avatar_url"
                        getValueProps={(value) => ({
                            fileList: [{ url: value, name: value, uid: value }],
                        })}
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            listType="picture"
                            beforeUpload={() => false}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};