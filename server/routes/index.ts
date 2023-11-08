import { NextFunction, Request, type RequestHandler, Response, Router } from 'express'
import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'
import asyncMiddleware from '../middleware/asyncMiddleware'
import config from '../config'

const defaultTokenProvider = (request: Request, response: Response, next: NextFunction): string => {
  if (response.locals.user && response.locals.user.token) {
    return response.locals.user.token
  }
  next('Could not find user token in response.locals.user.token')
  return null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function routes(): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  get('/', (req, res) => {
    res.render('pages/index')
  })

  get(
    '/list',
    ReportListUtils.createReportListRequestHandler({
      title: 'Test app',
      definitionName: 'fake-preferences',
      variantName: 'all',
      apiUrl: config.apis.report.url,
      apiTimeout: 8000,
      layoutTemplate: 'partials/layout.njk',
      tokenProvider: defaultTokenProvider,
    }),
  )

  return router
}
