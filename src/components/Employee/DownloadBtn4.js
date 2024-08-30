import React, { useState } from 'react';
import axios from 'axios';
import Loading from 'react-loading'; // 로딩 스피너 추가
import { Button } from 'react-bootstrap';


const API_URL = process.env.REACT_APP_API_URL;

function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const response = await axios({
        url: `${API_URL}/download-excel/employee`,
        method: 'POST',
        responseType: 'blob',
      });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      const fileName = '전체_사용자.xlsx';

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      alert('다운로드가 완료되었습니다!');

    } catch (error) {
      console.error('Download failed', error);
      alert('다운로드 실패');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      {isDownloading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
          <Loading type="spin" color="#000" height={50} width={50} />
          <span style={{ marginLeft: '10px' }}>다운로드 중입니다...</span>
        </div>
      ) : (
        <Button 
          onClick={handleDownload} 
          disabled={isDownloading}
          variant="primary" // 부트스트랩 버튼 스타일
        >
        전체 사용자 엑셀 다운
        </Button>
      )}
    </div>
  );
}

export default DownloadButton;
