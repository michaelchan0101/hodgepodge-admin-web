import React from 'react'
import { Modal } from 'antd'

interface CreateFormProps {
  modalVisible: boolean
  onCancel: () => void
  onSubmit: (data: Category.CreateRequest) => void
  category: Category.Response
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, onCancel } = props

  return (
    <Modal
      destroyOnClose
      title="编辑规则"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    />
  )
}

export default CreateForm
