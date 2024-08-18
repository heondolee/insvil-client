import React from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function DownloadButton({ modelName, initialPart }) {
  const downloadPart = async (part) => {
    console.log('안녕');
    try {
      console.log(`Starting download for part ${part}`); // 디버깅용 콘솔 로그
      const response = await axios({
        url: `${API_URL}/download-excel/${part}`,
        method: 'POST',
        responseType: 'blob',
        data: {
          modelName,
        },
      });


      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${modelName}_part_${part}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      return true;
    } catch (error) {
      console.error(`Download error for part ${part}:`, error);
      return false;
    }
  };

  const handleDownload = async () => {
    console.log('Download process started'); // 디버깅용 콘솔 로그
    let part = initialPart || 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const success = await downloadPart(part);
      if (success) {
        part += 1;
      } else {
        console.log(`No more data to download after part ${part}`); // 디버깅용 콘솔 로그
        hasMoreData = false;
      }
    }
    console.log('Download process finished'); // 디버깅용 콘솔 로그
  };

  return (
    <div>
      <button onClick={handleDownload}>Download {modelName} Excel</button>
    </div>
  );
}

export default DownloadButton;
