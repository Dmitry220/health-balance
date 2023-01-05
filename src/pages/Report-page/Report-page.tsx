import React, { FC, useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header/Header'
import HealthIndexService from '../../services/HealthIndexService';
import './report-page.scss'
import { useParams } from 'react-router-dom';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';
import { showToast } from '../../utils/common-functions';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const ReportPage = () => {
  const reportTemplateRef: any = useRef(null);
  const params = useParams()
  const [htmlReport, setHtmlReport] = useState<string>('')
  const [base, setBase] = useState<any>('')

  const options = {
    orientation: 'landscape',
    unit: 'in',
  };

  useEffect(() => {
    (async () => {
      const response = await HealthIndexService.getReport(Number(params.id))
      setHtmlReport(response.data)
      PDFGenerator.fromData(response.data, { documentSize: 'A4', type: 'base64' }).then((base64) => {
        setBase(base64)    
      })
      .catch((err) => console.log(err))
    })();
  }, [])


  return (
    <div className={'report-page'}>
      <Header title={'Отчет'} />
      {<div ref={reportTemplateRef} className='report-page__content' dangerouslySetInnerHTML={{ __html: htmlReport }} />}
      {/* <Pdf targetRef={reportTemplateRef} filename="Отчет.pdf" x={.5} y={.5} options={options}>
        {({ toPdf }: any) => <button className='report-page__button' onClick={toPdf}>Скачать отчет в PDF</button>}
      </Pdf> */} <br />
      {/* <button onClick={downloadReport} className={'report-page__button'}>Скачать pdf</button> */}
      <a href={base} className={'report-page__button'} download={'Отчет'} >Скачать pdf</a>
    </div>
  )
}