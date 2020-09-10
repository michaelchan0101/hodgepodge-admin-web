import { PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'

import {
  createAdmin,
  updateAdminPassword,
  listAdmins,
  deleteAdmin,
} from '@/services/admin'
import CreateForm from './components/CreateForm'
import UpdateForm from './components/UpdateForm'

/**
 * 添加分类
 * @param fields
 */
const handleCreate = async (data: ADMIN.CreateRequest) => {
  const hide = message.loading('正在处理')
  await createAdmin(data)
  hide()
  message.success('添加成功')
  return true
}

/**
 * 更新节点
 * @param fields
 */
const handleUpdatePassword = async (id: number, data: ADMIN.UpdatePasswordRequest) => {
  const hide = message.loading('正在处理')
  try {
    await updateAdminPassword(id, data)
    hide()
    message.success('修改密码成功')
    return true
  } catch (error) {
    hide()
    return false
  }
}

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false)
  const [stepFormValues, setStepFormValues] = useState<{
    admin: ADMIN.Response | null
    visible: boolean
  }>({
    admin: null,
    visible: false,
  })
  const actionRef = useRef<ActionType>()

  const handleDelete = async (id: number) => {
    const hide = message.loading('删除中......')
    try {
      await deleteAdmin(id)
      message.success('删除成功')
      actionRef.current?.reload()
    } finally {
      hide()
    }
  }
  const columns: ProColumns<ADMIN.Response>[] = [
    {
      title: '名称',
      dataIndex: 'username',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, admin) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setStepFormValues({ admin, visible: true })
            }}
          >
            修改
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              handleDelete(admin.id)
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ]

  return (
    <PageContainer>
      <ProTable<ADMIN.Response>
        headerTitle="管理员列表"
        actionRef={actionRef}
        search={false}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={() => listAdmins()}
        columns={columns}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        onSubmit={async value => {
          const success = await handleCreate(value)
          if (success) {
            handleModalVisible(false)
            actionRef.current?.reload()
          }
        }}
        modalVisible={createModalVisible}
      />
      {stepFormValues.admin ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdatePassword(
              stepFormValues.admin?.id || 0,
              value,
            )
            if (success) {
              setStepFormValues({ admin: null, visible: false })
              actionRef.current?.reload()
            }
          }}
          onCancel={() => {
            setStepFormValues({ admin: null, visible: false })
          }}
          modalVisible={stepFormValues.visible}
          admin={stepFormValues.admin}
        />
      ) : null}
    </PageContainer>
  )
}

export default TableList
