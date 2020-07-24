import React from 'react'
import { Modal, Card, Form, Input, InputNumber, Select, message } from 'antd'

interface UpdateFormProps {
  modalVisible: boolean
  onCancel: () => void
  onSubmit: (data: Category.CreateRequest) => void
  category: Category.Response
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm()
  const { modalVisible, onCancel, onSubmit, category } = props
  const handleSave = () => {
    form
      .validateFields()
      .then(value => {
        onSubmit(value)
      })
      .catch(err => {
        message.error(err.errorFields[0].errors[0])
      })
  }
  return (
    <Modal
      destroyOnClose
      title="编辑规则"
      visible={modalVisible}
      onOk={handleSave}
      onCancel={() => onCancel()}
    >
      <Card bordered={false} size="small">
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{ ...category, isShowInMenu: category.isShowInMenu ? 1 : 0 }}
        >
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="isShowInMenu" label="菜单展示" rules={[{ required: true }]}>
            <Select>
              <Select.Option value={1}>是</Select.Option>
              <Select.Option value={0}>否</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="sort" label="排序" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  )
}

export default UpdateForm
