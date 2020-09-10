import React from 'react'
import { Modal, Card, Form, Input, message } from 'antd'

interface CreateFormProps {
  modalVisible: boolean
  onCancel: () => void
  onSubmit: (data: ADMIN.CreateRequest) => void
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, onCancel, onSubmit } = props
  const [form] = Form.useForm()

  const handleSave = () => {
    form
      .validateFields()
      .then(value => {
        onSubmit({ password: value.password, username: value.username })
      })
      .catch(err => {
        message.error(err.errorFields[0].errors[0])
      })
  }
  return (
    <Modal
      destroyOnClose
      title="新建管理员"
      visible={modalVisible}
      onOk={handleSave}
      onCancel={() => onCancel()}
    >
      <Card bordered={false} size="small">
        <Form {...formItemLayout} form={form} autoComplete="off">
          <Form.Item name="username" label="用户名" rules={[{ required: true, min: 2 }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, min: 6 }]}>
            <Input type="password" autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            name="repassword"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('密码输入不一致')

                  // return Promise.reject(new Error('密码输入不一致'))
                  // throw new Error('密码输入不一致')
                },
              }),
            ]}
          >
            <Input type="password" autoComplete="new-password" />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  )
}

export default CreateForm
