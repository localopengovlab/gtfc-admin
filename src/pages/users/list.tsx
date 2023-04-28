import {
  List,
  SaveButton,
  EditButton,
  useEditableTable,
} from "@refinedev/antd";
import { Table, Form, Space, Button, Avatar, Tag, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { TUser } from "types/user";

export const UserList: React.FC = () => {
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<TUser>();

  return (
  <List title="Utilisateurs">
    <Form {...formProps}>
      <Table
        {...tableProps}
        rowKey="id"
        onRow={(record) => ({
            // eslint-disable-next-line
            onClick: (event: any) => {
                if (event.target.nodeName === "TD") {
                    setEditId && setEditId(record.id);
                }
            },
        })}
      >
      <Table.Column
      dataIndex="avatar_url"
      title={
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
              Avatar
          </h4>
      }
      render={(_, record: TUser) => (
          <Avatar
              icon={<UserOutlined />}
              src={record.avatar_url}
              size={{ xs: 24, sm: 32, md: 40 }}
          />
      )}
      />
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="email" title="E-mail" />
      <Table.Column
        dataIndex="full_name"
        title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                Nom Prénom
            </h4>
        }
        render={(_, record: TUser) =>
            record.full_name ? (
                <p
                    style={{
                        textAlign: "center",
                    }}
                >
                    {record.full_name}
                </p>
            ) : (
                <p
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    --
                </p>
            )
        }
      />
      <Table.Column
        dataIndex="username"
        title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                Nom Utilisateur
            </h4>
        }
        render={(_, record: TUser) =>
            record.username ? (
                <p
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    {record.username}
                </p>
            ) : (
                <p
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    --
                </p>
            )
        }
      />
      <Table.Column<TUser>
          dataIndex="role"
          title="Rôle"
          render={(value, record) => {
              if (isEditing(record.id)) {
                  return (
                      <Form.Item
                        name="role"
                        style={{ margin: 0 }}
                      >
                        <Select
                          defaultValue={value}
                          style={{ width: 120 }}
                          options={[
                            { value: 'editeur', label: 'editeur' },
                            { value: 'admin', label: 'admin' },
                          ]}
                        />
                      </Form.Item>
                  );
              }
              return (
                <Tag
                  color="error"
                  style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                  }}
                >
                  {value}
                </Tag>
              );
          }}
      />
      <Table.Column<TUser>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => {
              if (isEditing(record.id)) {
                  return (
                      <Space>
                          <SaveButton
                              {...saveButtonProps}
                              hideText
                              size="small"
                          />
                          <Button
                              {...cancelButtonProps}
                              size="small"
                          >
                              Cancel
                          </Button>
                      </Space>
                  );
              }
              return (
                  <EditButton
                      {...editButtonProps(record.id)}
                      hideText
                      size="small"
                  />
              );
          }}
      />
      </Table>
    </Form>
  </List>
  );
};