import { Button, Input, Modal, Space, Table, Form, Checkbox } from "antd";
import { Fragment, useEffect, useState } from "react";
import request from "../server";

export const TeacherPage = () => {
  const columns = [
    {
      title: "Fisrtname",
      dataIndex: "name",
      key: "name",
      render: (text) => <h2>{text}</h2>,
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <h2>{text}</h2>,
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (data, row) => {
        return <img src={data}></img>;
      },
    },
    {
      title: "isMarried",
      key: "isMarried",
      dataIndex: "isMarried",
      render: () => (data ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => edit(record.id)}>
            Edit
          </Button>
          <Button onClick={() => deleteData(record.id)} danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      let { data } = await request.get("teacher");
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }
  const showModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("teacher", values);
      } else {
        await request.put(`teacher/${selected}`, values);
      }
      getData();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function edit(id) {
    setSelected(id);
    setIsModalOpen(true);
    let { data } = await request.get(`teacher/${id}`);
    form.setFieldsValue(data);
  }

  async function deleteData(id, e) {
    let { data } = request.delete(`teacher/${id}`);
    form.delete(data);
  }
  return (
    <Fragment>
      <Table
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Teachers ({data.length})</h1>
            <Button onClick={showModal} type="primary">
              Add
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Teacher data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected === null ? "Add teacher" : "Save"}
      >
        <Form
          form={form}
          name="login"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Firtname"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your fisrtname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please input your image!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isMarried"
            wrapperCol={{
              span: 24,
            }}
          >
            <Checkbox>isMarried</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};
