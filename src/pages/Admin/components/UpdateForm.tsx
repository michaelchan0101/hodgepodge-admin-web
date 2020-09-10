import React from 'react'
import { Modal, Card, Form, Input, message } from 'antd'

interface UpdateFormProps {
  modalVisible: boolean
  onCancel: () => void
  onSubmit: (data: ADMIN.UpdatePasswordRequest) => void
  admin: ADMIN.Response
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm()
  const { modalVisible, onCancel, onSubmit } = props
  const handleSave = () => {
    form
      .validateFields()
      .then(value => {
        onSubmit({ password: value.password })
      })
      .catch(err => {
        message.error(err.errorFields[0].errors[0])
      })
  }
  return (
    <Modal
      destroyOnClose
      title="修改管理员密码"
      visible={modalVisible}
      onOk={handleSave}
      onCancel={() => onCancel()}
    >
      <Card bordered={false} size="small">
        <Form {...formItemLayout} form={form} autoComplete="off">
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

export default UpdateForm
