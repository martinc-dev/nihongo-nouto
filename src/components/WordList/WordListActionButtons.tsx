import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { getCurrentContentType } from 'src/selectors/nav'
import resourceTypes from 'src/constants/resourceTypes'

const PREFIX = 'WordListActionButtons'

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  [`& .${classes.button}`]: {
    minWidth: 40,
  },
}))

interface WordListActionButtonsProps {
  onCreateClick: () => void
}

const WordListActionButtons = ({ onCreateClick }: WordListActionButtonsProps) => {
  const [isImporting, setIsImporting] = useState(false)

  const currentContentType = useSelector(getCurrentContentType)
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExportClick = async () => {
    if (!currentContentType) return
    const resourcePath = resourceTypes[currentContentType]?.pathName

    if (resourcePath) {
      try {
        const response = await fetch(`/api/${resourcePath}/export`)

        if (!response.ok) throw new Error('Export failed')

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = `${resourcePath}_export.csv`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        // eslint-disable-next-line no-alert
        alert('Export failed')
      }
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file || !currentContentType) return

    const resourcePath = resourceTypes[currentContentType]?.pathName

    if (!resourcePath) return

    setIsImporting(true)

    try {
      const text = await file.text()

      const response = await fetch(`/api/${resourcePath}/import`, {
        method: 'POST',
        body: text,
        headers: {
          'Content-Type': 'text/csv',
        },
      })

      if (!response.ok) {
        throw new Error('Import failed')
      }

      const result = await response.json()

      // Invalidate query to refresh list
      queryClient.invalidateQueries({ queryKey: ['wordList', currentContentType] })

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      const message = `Import completed.\nSuccess: ${result.success}\nFailed: ${result.failed}\nSkipped (Duplicates): ${result.skipped}`

      // eslint-disable-next-line no-alert
      alert(message)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      // eslint-disable-next-line no-alert
      alert('Import failed. Please check the CSV format.')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <Root className={classes.root}>
      <input
        accept='.csv'
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type='file'
      />
      <Button
        className={classes.button}
        disabled={isImporting}
        onClick={handleImportClick}
        size='small'
        startIcon={<FileUploadIcon />}
      >
        {isImporting ? '...' : ''}
      </Button>
      <Button
        className={classes.button}
        onClick={handleExportClick}
        size='small'
        startIcon={<FileDownloadIcon />}
      />
      <Button
        className={classes.button}
        onClick={onCreateClick}
        size='small'
        startIcon={<AddIcon />}
      >
        Create
      </Button>
    </Root>
  )
}

export default WordListActionButtons
