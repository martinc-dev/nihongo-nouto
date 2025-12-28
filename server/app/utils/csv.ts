// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCSV = (csvText: string): Record<string, any>[] => {
  const lines = csvText.trim().split(/\r?\n/)

  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))

  return lines.slice(1).map(line => {
    // Split by comma, ignoring commas inside quotes
    const values = line
      .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      .map(v => v.trim().replace(/^"|"$/g, '').replace(/""/g, '"'))

    return headers.reduce(
      (obj, header, i) => {
        obj[header] = values[i]

        return obj
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as Record<string, any>,
    )
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toCSV = (data: Record<string, any>[]): string => {
  if (!data.length) return ''
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers
        .map(header => {
          const val =
            row[header] === null || row[header] === undefined ? '' : String(row[header])

          return `"${val.replace(/"/g, '""')}"`
        })
        .join(','),
    ),
  ]

  return csvRows.join('\n')
}
