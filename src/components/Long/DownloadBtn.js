import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Loading from 'react-loading'; // 로딩 스피너 추가

const API_URL = process.env.REACT_APP_API_URL;

const customStyles = {
  option: (provided) => ({
    ...provided,
    fontSize: '12px', // 글씨 크기를 12px로 설정
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '12px', // 선택된 값의 글씨 크기를 12px로 설정
  }),
};

function DownloadButton({ modelName, startDate, endDate, dateType, responsibleName }) {

  console.log('⚠️ responsibleName:', responsibleName, '⚠️ modelName:', modelName, '⚠️ startDate:', startDate, '⚠️ endDate:', endDate, '⚠️ dateType:', dateType);

  const [isDownloading, setIsDownloading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchRanges = async () => {
      try {
        const response = await axios.get(`${API_URL}/download-excel/count`, {
          params: { modelName, startDate, endDate, dateType, responsibleName },
        });
  
        // 백엔드에서 받은 ranges 데이터를 그대로 사용
        const { ranges } = response.data;

        console.log('💕 Received ranges:', ranges);
  
        // 받은 ranges 데이터를 options 형식으로 변환
        const options = ranges.map((range, index) => ({
          value: `${index + 1}: ${range[0]} ~ ${range[1]}`,
          label: `${range[0]} ~ ${range[1]}`,
        }));
  
        setOptions(options);
      } catch (error) {
        console.error('Failed to fetch ranges', error);
      }
    };
  
    fetchRanges();
  }, [modelName, startDate, endDate, dateType, responsibleName]);

  const handleDownload = async (startDate, endDate, dateType, responsibleName) => {

    try {
      setIsDownloading(true);

      const response = await axios({
        url: `${API_URL}/download-excel`,
        method: 'POST',
        responseType: 'blob',
        data: { modelName, startDate, endDate, dateType, responsibleName },
      });

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${modelName}_${startDate}-${endDate}.xlsx`);
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
      // 앞부분의 "1:"를 제거하고 나머지 부분을 처리
      const dateRange = selectedOption.value.split(': ')[1];
      const [startDate, endDate] = dateRange.split('~').map(date => date.trim());
  
      handleDownload(startDate, endDate, dateType, responsibleName);
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
        <Select
          options={options} // 드롭다운에 표시할 옵션 리스트
          onChange={handleChange} // 선택된 옵션에 대한 처리
          isDisabled={isDownloading} // 다운로드 중일 때 비활성화
          placeholder="엑셀 다운" // 플레이스홀더 텍스트
          styles={customStyles} // customStyles를 적용
        />
      )}
    </div>
  );
}

export default DownloadButton;
