import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { listCategories } from '@/services/category'

interface CategorySelectorProps {
  className?: string
  selectId?: number | null
  onChange?: (value: number) => void
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  className,
  selectId,
  onChange,
}) => {
  const [categories, setCategories] = useState<Category.Response[]>([])
  useEffect(() => {
    listCategories().then(({ data }) => {
      setCategories(data)
    })
  }, [])
  return (
    <Select
      placeholder="请选择分类"
      className={className}
      value={selectId ?? undefined}
      onChange={onChange}
    >
      {categories.map(category => (
        <Select.Option value={category.id} key={category.id}>
          {category.name}
        </Select.Option>
      ))}
    </Select>
  )
}
export default CategorySelector
