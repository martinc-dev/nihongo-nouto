import { Request, Response } from 'express'
import https from 'https'
import { logError } from '../utils/logger'

const JISHO_API_HOST = 'jisho.org'
const JISHO_API_PATH = '/api/v1/search/words'

export class JishoController {
  search = async (req: Request, res: Response): Promise<void> => {
    const { keyword } = req.params
    
    const options = {
      hostname: JISHO_API_HOST,
      path: `${JISHO_API_PATH}?keyword=${encodeURIComponent(keyword)}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }

    const request = https.request(options, (response) => {
      let data = ''

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => {
        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
          try {
             const json = JSON.parse(data)
             res.json(json)
          } catch (e) {
             logError(e)
             res.status(500).json({ message: 'Error parsing Jisho response' })
          }
        } else {
          res.status(response.statusCode || 500).json({ message: 'Jisho API Error', status: response.statusCode })
        }
      })
    })

    request.on('error', (error) => {
      logError(error)
      res.status(500).json({ message: 'Jisho API Error (Backend)', error: String(error) })
    })

    request.end()
  }
}
