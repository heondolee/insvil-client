import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const API_URL = process.env.REACT_APP_API_URL;
const BATCH_SIZE = 1000; // 한번에 처리할 레코드 수

function DownloadButton({ modelName }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [options, setOptions] = useState([]);

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
            value: `${i + 1}~${Math.min(i + BATCH_SIZE, rowCount)}`,
            label: `${i + 1} ~ ${Math.min(i + BATCH_SIZE, rowCount)} 엑셀 다운`,
          });
        }

        setOptions(ranges);
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

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      const [start, end] = selectedOption.value.split('~').map(Number);
      handleDownload(start, end);
    }
  };

  return (
    <div>
      <Select
        options={options} // 드롭다운에 표시할 옵션 리스트
        onChange={handleChange} // 선택된 옵션에 대한 처리
        isDisabled={isDownloading} // 다운로드 중일 때 비활성화
        placeholder="엑셀 다운로드 범위 선택" // 플레이스홀더 텍스트
      />
    </div>
  );
}

export default DownloadButton;
