import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

function DownloadButton({ modelName }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const response = await axios({
        url: `${API_URL}/download-excel`,
        method: 'POST',
        responseType: 'blob',
        data: { modelName },
      });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${modelName}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      alert('다운이 완료됐습니다!');  // 다운로드 완료 후 알림

    } catch (error) {
      console.error('Download failed', error);
      alert('다운로드 실패');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleDownload} disabled={isDownloading}>
        {modelName} 엑셀 다운
      </Button>
    </div>
  );
}

export default DownloadButton;
