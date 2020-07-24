import React from 'react'
import { Input, Form } from 'antd'

const CreateAndUpdateArticle: React.FC<{}> = () => {
  const [form] = Form.useForm()
  return (
    <>
      <Form form={form}>
        <Input placeholder="请输入标题" size="large" />
        <Input.TextArea autoSize={{ minRows: 40, maxRows: 40 }} />
      </Form>
    </>
  )
}

export default CreateAndUpdateArticle
