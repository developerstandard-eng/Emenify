import { useEffect } from 'react'
import { company } from '@/data/site'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${company.name}`
  }, [title])
}
