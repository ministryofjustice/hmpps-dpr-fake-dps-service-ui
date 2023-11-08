import { type RequestHandler, Router } from 'express'
import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'
import defaultTokenProvider from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/defaultTokenProvider'
import asyncMiddleware from '../middleware/asyncMiddleware'
import config from '../config'

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
      apiTimeout: config.apis.report.timeout,
      layoutTemplate: 'partials/layout.njk',
      tokenProvider: defaultTokenProvider,
    }),
  )

  return router
}
