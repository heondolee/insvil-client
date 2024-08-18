import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const API_URL = process.env.REACT_APP_API_URL;

function DownloadButton({ modelName, initialPart }) {
  const downloadPart = async (part) => {
    try {
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
      return false;
    }
  };

  const handleDownload = async () => {
    let part = initialPart || 1;
    let hasMoreData = true;

    if (hasMoreData) {
      const success = await downloadPart(part);
      if (success) {
        part += 1;
      } else {
        hasMoreData = false;
      }
    }
  };

  return (
    <div>
      <Button onClick={handleDownload}>{modelName} 엑셀 다운</Button>
    </div>
  );
}

export default DownloadButton;
