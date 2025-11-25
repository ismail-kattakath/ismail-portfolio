import AIDocumentGeneratorModal from '@/components/document-builder/shared-forms/AIDocumentGeneratorModal'
import type { ResumeData } from '@/types'

interface AIGenerateSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (content: string) => void
  resumeData: ResumeData
}

const AIGenerateSummaryModal: React.FC<AIGenerateSummaryModalProps> = (
  props
) => {
  return <AIDocumentGeneratorModal {...props} mode="summary" />
}

export default AIGenerateSummaryModal
