import React, { FC, useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header/Header'
import HealthIndexService from '../../services/HealthIndexService';
import './report-page.scss'
import { useParams } from 'react-router-dom';
//@ts-ignore
import Pdf from "react-to-pdf";

export const ReportPage = () => {
  const reportTemplateRef: any = useRef(null);
  const params = useParams()
  const [htmlReport, setHtmlReport] = useState<string>('')

  const options = {
    orientation: 'landscape',
    unit: 'in',
  };

  useEffect(() => {
    (async () => {
      const response = await HealthIndexService.getReport(Number(params.id))
      setHtmlReport(response.data)
    })();
  }, [])

  return (
    <div className={'report-page'}>
      <Header title={'Отчет'} />
      {<div ref={reportTemplateRef} className='report-page__content' dangerouslySetInnerHTML={{ __html: htmlReport }} />}
      <Pdf targetRef={reportTemplateRef} filename="Отчет.pdf" x={.5} y={.5} options={options}>
        {({ toPdf }: any) => <button className='report-page__button' onClick={toPdf}>Скачать отчет в PDF</button>}
      </Pdf>
    </div>
  )
}