import { PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'

import { listArticles, deleteArticle } from '@/services/article'
import { history } from 'umi'

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>()

  const handleDelete = async (id: number) => {
    const hide = message.loading('删除中......')
    try {
      await deleteArticle(id)
      message.success('删除成功')
      actionRef.current?.reload()
    } finally {
      hide()
    }
  }
  const columns: ProColumns<Article.Response>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      hideInSearch: true,
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
      render: (_, article) => (
        <>
          <Button
            type="link"
            onClick={() => {
              history.push(`/article/${article.id}`)
            }}
          >
            修改
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              handleDelete(article.id)
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
      <ProTable<Article.Response>
        headerTitle="文章列表"
        actionRef={actionRef}
        search={false}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => history.push(`/article/create`)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={params => listArticles(params.current, params.pageSize)}
        columns={columns}
      />
    </PageContainer>
  )
}

export default TableList
