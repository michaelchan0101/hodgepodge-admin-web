import React, { useState, ChangeEvent, useEffect } from 'react'
import { Input } from 'antd'
import marked from 'marked'

interface EditorProps {
  content?: string
  onChange?: (value: string) => void
}

const styles: any = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  editor: {
    width: '49%',
    paddingTop: '20px',
    paddingLeft: '20px',
    backgroundColor: '#f8f9fa',
    borderTop: 'none',
    resize: 'none',
  },
  review: {
    width: '49%',
    paddingTop: '20px',
    paddingLeft: '20px',
  },
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  const [contentHtml, setContentHtml] = useState(content ? marked(content) : '')
  useEffect(() => {
    setContentHtml(content ? marked(content) : '')
  }, [content])
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <div style={styles.container}>
      <Input.TextArea
        style={styles.editor}
        autoSize={{ minRows: 50 }}
        onChange={handleContentChange}
        value={content}
      />
      <div style={styles.review} dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  )
}
export default Editor
