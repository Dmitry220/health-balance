import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header/Header'
import HealthIndexService from '../../services/HealthIndexService'
import './report-page.scss'
import { useParams, useLocation } from 'react-router-dom'
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator'
import { showToast } from '../../utils/common-functions'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { FileOpener } from '@capacitor-community/file-opener'

type LocationProps = {
  state: {
    date: String
  }
}

export const ReportPage = () => {
  const reportTemplateRef: any = useRef(null)

  const params = useParams()
  const location = useLocation() as unknown as LocationProps

  const [htmlReport, setHtmlReport] = useState<string>('')

  useEffect(() => {
    async function getReport() {
      const response = await HealthIndexService.getReport(Number(params.id))
      let style = `
        <style>
          h1 {
            font-size: 15px;
            font-weight: bold;
            padding: 4px;
          }
          div {
            padding: 4px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th {
            padding-top: 12px;
            padding-bottom: 12px;
            background-color: #04AA6D;
            color: white;
          }
          tr {
            border: 0px solid;
          }
          tr:nth-child(even) { 
            background-color: #f2f2f2;
          }
          tr:hover {
            background-color: #ddd;
          }
        </style>
      `
      setHtmlReport(style + response.data)
    }

    getReport()
  }, [])

  async function writeFile(fileName: string, fileData: any) {
    Filesystem.writeFile({
      path: fileName,
      data: fileData,
      directory: Directory.Documents
    }).then(() => {
      Filesystem.getUri({
        directory: Directory.Documents,
        path: fileName
      }).then(
        (getUriResult) => {
          const path = getUriResult.uri
          FileOpener.open({ filePath: path, contentType: 'application/pdf' })
            .then(() => console.log('File is opened'))
            .catch((error) => console.log('Error openening file', error))
        },
        (error) => {
          console.log(error)
        }
      )
    })
  }

  async function downloadReport() {
    // генерируем PDF из отчёта
    PDFGenerator.fromData(htmlReport, { documentSize: 'A4' })
      .then((base64) => {
        // скачиваем PDF на телефон
        writeFile(`report${location.state.date}.pdf`, base64)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={'report-page'}>
      <Header title={'Отчет'} />

      <div
        ref={reportTemplateRef}
        className='report-page__content'
        dangerouslySetInnerHTML={{ __html: htmlReport }}
      />

      <div onClick={() => downloadReport()} className={'report-page__button'}>
        Скачать отчет
      </div>
    </div>
  )
}
