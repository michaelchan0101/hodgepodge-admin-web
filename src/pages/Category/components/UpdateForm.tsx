import React from 'react'
import { Modal, Card, Form, Input, InputNumber, Select } from 'antd'

interface CreateFormProps {
  modalVisible: boolean
  onCancel: () => void
  onSubmit: (data: Category.CreateRequest) => void
  category: Category.Response
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm()
  const { modalVisible, onCancel, category } = props
  return (
    <Modal
      destroyOnClose
      title="编辑规则"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Card bordered={false} size="small">
        <Form {...formItemLayout} form={form}>
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input value={category?.name} />
          </Form.Item>
          <Form.Item name="name" label="菜单展示" rules={[{ required: true }]}>
            <Select defaultValue={category.isShowInMenu ? 1 : 0}>
              <Select.Option value={1}>是</Select.Option>
              <Select.Option value={0}>否</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="name" label="排序" rules={[{ required: true }]}>
            <InputNumber value={category?.sort} />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  )
}

export default CreateForm
