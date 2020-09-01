import React, { useState, ChangeEvent } from 'react'
import { Input, Form, message, PageHeader, Button } from 'antd'
import { local } from 'webstorage-utils'
import { createArticle } from '@/services/article'
import styles from './style.less'
import CategorySelector from './components/CategorySelector'
import Editor from './components/Editor'

const CONTENT_CACHE_KEY = 'CREATE_ARTICLE_CONTENT'
const TITLE_CACHE_KEY = 'CREATE_ARTICLE_TITLE'
const CATEGORY_CACHE_KEY = 'CREATE_ARTICLE_CATEGORY'

export default () => {
  const [form] = Form.useForm()
  const [content, setContent] = useState<string>(local.get(CONTENT_CACHE_KEY) ?? '')
  const [title, setTitle] = useState(local.get(TITLE_CACHE_KEY) ?? '')
  const [categoryId, setCategoryId] = useState<number | null>(
    local.get(CATEGORY_CACHE_KEY) ?? null,
  )
  const updateContent = (text: string) => {
    local.set(CONTENT_CACHE_KEY, text)
    setContent(text)
  }
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    local.set(TITLE_CACHE_KEY, event.target.value)
    setTitle(event.target.value)
  }
  const handleCatgoryChange = (value: number) => {
    local.set(CATEGORY_CACHE_KEY, value)
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
    await createArticle({
      categoryId,
      title,
      content,
    }).finally(() => {
      loading = false
      hide()
    })
    message.success('新建成功')
    local.del(TITLE_CACHE_KEY).del(CONTENT_CACHE_KEY).del(CATEGORY_CACHE_KEY)
    setCategoryId(null)
    setTitle('')
    setContent('')
  }
  return (
    <>
      <PageHeader
        title="新建文章"
        ghost={false}
        onBack={() => window.history.back()}
        className={styles.title}
        // breadcrumb={{ routes }}
        extra={[
          <CategorySelector onChange={handleCatgoryChange} selectId={categoryId} />,
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
        {/* <div className={styles.mdContainer}>
          <Input.TextArea
            className={styles.editor}
            autoSize={{ minRows: 50 }}
            onChange={handleContentChange}
            value={content}
          />
          <div
            className={styles.review}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div> */}
      </Form>
    </>
  )
}
