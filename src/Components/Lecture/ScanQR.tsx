import React from "react";
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

import './lecture.scss'
import { lessonSelector } from "../../Redux/slice/lessonsSlice";
import { useAppSelector } from "../../utils/hooks/redux-hooks";

export const ScanQR = () => {

  const lesson = useAppSelector(lessonSelector)

    const startScan = async () => {
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true });
      
        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        BarcodeScanner.hideBackground();
      
        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      
        // if the result has content
        if (result.hasContent && result.content === lesson?.qr_code) {
          console.log(result.content); // log the raw scanned content
        }
      };

    return (
        <>
            <button className="task-lecture__button-execute _button-white" onClick={startScan}>Сканировать QR</button>
        </>
    )
}
