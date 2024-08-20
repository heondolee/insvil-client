import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;
const BATCH_SIZE = 1000; // 한번에 처리할 레코드 수

function DownloadButton({ modelName }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [buttonRanges, setButtonRanges] = useState([]);

  useEffect(() => {
    const fetchRowCount = async () => {
      try {
        const response = await axios.get(`${API_URL}/download-excel/count`, {
          params: { modelName }
        });

        const rowCount = response.data.count;
        const ranges = [];

        for (let i = 0; i < rowCount; i += BATCH_SIZE) {
          ranges.push({
            start: i + 1,
            end: Math.min(i + BATCH_SIZE, rowCount),
          });
        }

        setButtonRanges(ranges);
      } catch (error) {
        console.error('Failed to fetch row count', error);
      }
    };

    fetchRowCount();
  }, [modelName]);

  const handleDownload = async (start, end) => {
    try {
      setIsDownloading(true);

      const response = await axios({
        url: `${API_URL}/download-excel`,
        method: 'POST',
        responseType: 'blob',
        data: { modelName, start, end },
      });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${modelName}_${start}-${end}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      alert('다운이 완료됐습니다!');

    } catch (error) {
      console.error('Download failed', error);
      alert('다운로드 실패');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      {buttonRanges.map((range, index) => (
        <Button
          key={index}
          onClick={() => handleDownload(range.start, range.end)}
          disabled={isDownloading}
        >
          {`${range.start} ~ ${range.end} 엑셀 다운`}
        </Button>
      ))}
    </div>
  );
}

export default DownloadButton;
