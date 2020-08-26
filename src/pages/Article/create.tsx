import React, { useState, ChangeEvent } from 'react'
import { Input, Form } from 'antd'
import marked from 'marked'
import { local } from 'webstorage-utils'
import styles from './style.less'

const CONTENT_CACHE_KEY = 'CREATE_ARTICLE_CONTENT'
const TITLE_CACHE_KEY = 'CREATE_ARTICLE_TITLE'

const CreateAndUpdateArticle: React.FC<{}> = () => {
  const [form] = Form.useForm()
  const [content, setContent] = useState(local.get(CONTENT_CACHE_KEY) ?? '')
  const [title, setTitle] = useState(local.get(TITLE_CACHE_KEY) ?? '')
  const [contentHtml, setContentHtml] = useState(content ? marked(content) : '')
  const updateContent = (text: string) => {
    local.set(CONTENT_CACHE_KEY, text)
    setContent(text)
    setContentHtml(marked(text))
  }
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateContent(event.target.value)

    // const now = Date.now()
    // if (md.updated && now - md.updated > 500) {
    //   clearTimeout(timer)
    //   updateContent(event.target.value)
    // } else {
    //   clearTimeout(timer)
    //   timer = setTimeout(updateContent.bind(null, event.target.value), 500)
    // }
  }
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    local.set(TITLE_CACHE_KEY, event.target.value)
    setTitle(event.target.value)
  }
  return (
    <>
      <Form form={form}>
        <Input
          placeholder="请输入标题......"
          size="large"
          className={styles.titleInput}
          onChange={handleTitleChange}
          value={title}
        />
        <div className={styles.mdContainer}>
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
        </div>
      </Form>
    </>
  )
}

export default CreateAndUpdateArticle
