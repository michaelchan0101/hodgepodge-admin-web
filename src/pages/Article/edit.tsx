import React, { useState, ChangeEvent, useEffect } from 'react'
import { Input, Form, message, PageHeader, Button } from 'antd'
import { local } from 'webstorage-utils'
import { getArticle, updateArticle } from '@/services/article'
import { IRouteComponentProps } from 'umi'
import styles from './style.less'
import CategorySelector from './components/CategorySelector'
import Editor from './components/Editor'

const CONTENT_CACHE_KEY = 'UPDATE_ARTICLE_CONTENT'
const TITLE_CACHE_KEY = 'UPDATE_ARTICLE_TITLE'
const CATEGORY_CACHE_KEY = 'UPDATE_ARTICLE_CATEGORY'

export default (props: IRouteComponentProps) => {
  const { id } = props.match.params as { id: number }
  const [form] = Form.useForm()
  const [content, setContent] = useState<string>(
    local.get(`${CONTENT_CACHE_KEY}_${id}`) ?? '',
  )
  const [title, setTitle] = useState<string>(local.get(`${TITLE_CACHE_KEY}_${id}`) ?? '')
  const [categoryId, setCategoryId] = useState<number | null>(
    local.get(`${CATEGORY_CACHE_KEY}_${id}`) ?? null,
  )
  useEffect(() => {
    getArticle(id).then(article => {
      if (!title) {
        setTitle(article.title)
      }
      if (!categoryId) {
        setCategoryId(article.categoryId)
      }
      if (!content) {
        setContent(article.originalContent)
      }
    })
  }, [id])
  const updateContent = (text: string) => {
    local.set(`${CONTENT_CACHE_KEY}_${id}`, text)
    setContent(text)
  }
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    local.set(`${TITLE_CACHE_KEY}_${id}`, event.target.value)
    setTitle(event.target.value)
  }
  const handleCatgoryChange = (value: number) => {
    local.set(`${CATEGORY_CACHE_KEY}_${id}`, value)
    setCategoryId(value)
    // setTitle(event.target.value)
  }

  let loading = false
  const handleSubmit = async () => {
    if (loading) {
      return
    }
    if (!categoryId) {
      message.error('请选择分类')
      return
    }
    if (title === '') {
      message.error('请输入标题')
      return
    }
    if (content === '') {
      message.error('请输入内容')
      return
    }
    loading = true
    const hide = message.loading('正在提交...')
    await updateArticle(id, {
      categoryId,
      title,
      content,
    }).finally(() => {
      loading = false
      hide()
    })
    message.success('修改成功')
    local
      .del(`${TITLE_CACHE_KEY}_${id}`)
      .del(`${CONTENT_CACHE_KEY}_${id}`)
      .del(`${CATEGORY_CACHE_KEY}_${id}`)
  }
  return (
    <>
      <PageHeader
        title="修改文章"
        ghost={false}
        onBack={() => window.history.back()}
        className={styles.title}
        // breadcrumb={{ routes }}
        extra={[
          <CategorySelector
            onChange={handleCatgoryChange}
            selectId={categoryId}
            key="category_selector"
          />,
          <Button key="1" type="primary" onClick={handleSubmit}>
            提交
          </Button>,
        ]}
      />
      <Form form={form}>
        <Input
          placeholder="请输入标题......"
          size="large"
          className={styles.titleInput}
          onChange={handleTitleChange}
          value={title}
        />
        <Editor onChange={updateContent} content={content} />
      </Form>
    </>
  )
}
