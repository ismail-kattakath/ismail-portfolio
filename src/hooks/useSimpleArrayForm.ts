import { useContext } from 'react'
import { ResumeContext } from '@/lib/contexts/DocumentContext'
import type { ResumeData } from '@/types'

/**
 * Hook for managing simple string array fields (certifications, languages)
 * Simpler than useArrayForm since items are just strings, not objects
 */
export function useSimpleArrayForm(dataKey: 'certifications' | 'languages') {
  const { resumeData, setResumeData } = useContext(ResumeContext)
  const data = resumeData[dataKey] as string[]

  /**
   * Handle value change at specific index
   */
  const handleChange = (index: number, value: string) => {
    const newData = [...data]
    newData[index] = value
    setResumeData({ ...resumeData, [dataKey]: newData })
  }

  /**
   * Add new empty item
   */
  const add = () => {
    setResumeData({
      ...resumeData,
      [dataKey]: [...data, ''],
    })
  }

  /**
   * Remove item by index
   */
  const remove = (index: number) => {
    const newData = data.filter((_, i) => i !== index)
    setResumeData({ ...resumeData, [dataKey]: newData })
  }

  return {
    data,
    handleChange,
    add,
    remove,
  }
}
