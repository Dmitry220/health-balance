import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import { REPORT_ROUTE } from '../../provider/constants-route'
import { useEffect, useState } from 'react'
import { IListReport } from '../../models/IHealthIndex'
import HealthIndexService from '../../services/HealthIndexService'
import './individual-report-page.scss'

export const IndividualReportPage = () => {

  const [reports, setReports] = useState<IListReport[]>([])

  useEffect(() => {
    (async () => {
      const response = await HealthIndexService.getListReports()
      setReports(response.data.data)
    })();
  }, [])


  return (
    <div className={'individual-report-page'}>
      <Header title={'Индивидуальный отчет'} />
      {
        reports.map(report=>(
                <div className='individual-report-page__item' key={report.id}>
        <div className='individual-report-page__title main-title'>
          Отчет за {new Date(report.date*1000).toLocaleDateString()}
        </div>
        <Link
          to={REPORT_ROUTE+'/'+report.id}
          className='individual-report-page__link text-blue'
        >
          Открыть
        </Link>
      </div>
        ))
      }
    </div>
  )
}
