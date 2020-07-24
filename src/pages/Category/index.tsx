import { PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'

import { listCategories, createCategory, updateCategory } from '@/services/category'
import CreateForm from './components/CreateForm'
import UpdateForm from './components/UpdateForm'

/**
 * 添加分类
 * @param fields
 */
const handleCreate = async (fields: Category.CreateRequest) => {
  const hide = message.loading('正在处理')
  await createCategory({ ...fields })
  hide()
  message.success('添加成功')
  return true
}

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (id: number, fields: Category.CreateRequest) => {
  const hide = message.loading('正在处理')
  try {
    await updateCategory(id, {
      name: fields.name,
      isShowInMenu: !!fields.isShowInMenu,
      sort: fields.sort,
    })
    hide()

    message.success('配置成功')
    return true
  } catch (error) {
    hide()
    message.error('配置失败请重试！')
    return false
  }
}

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false)
  const [stepFormValues, setStepFormValues] = useState<{
    category: Category.Response | null
    visible: boolean
  }>({
    category: null,
    visible: false,
  })
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<Category.Response>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      title: '菜单展示',
      dataIndex: 'isShowInMenu',
      hideInSearch: true,
      renderText: (val: string) => (val ? '是' : '否'),
      valueEnum: { true: '是', false: '否' },
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
      hideInSearch: true,
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setStepFormValues({ category: record, visible: true })
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ]

  return (
    <PageContainer>
      <ProTable<Category.Response>
        headerTitle="分类列表"
        actionRef={actionRef}
        search={false}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={() => listCategories()}
        columns={columns}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<Category.Response, Category.CreateRequest>
          onSubmit={async value => {
            const success = await handleCreate(value)
            if (success) {
              handleModalVisible(false)
              if (actionRef.current) {
                actionRef.current.reload()
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues.category ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(stepFormValues.category?.id || 0, value)
            if (success) {
              setStepFormValues({ category: null, visible: false })
              if (actionRef.current) {
                actionRef.current.reload()
              }
            }
          }}
          onCancel={() => {
            setStepFormValues({ category: null, visible: false })
          }}
          modalVisible={stepFormValues.visible}
          category={stepFormValues.category}
        />
      ) : null}
    </PageContainer>
  )
}

export default TableList
