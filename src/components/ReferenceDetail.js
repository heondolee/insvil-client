import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Navigation from './layouts/Navigation';

const API_URL = process.env.REACT_APP_API_URL;

const ReferenceDetail = () => {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [reference, setReference] = useState({ title: '', content: '', fileUrl: '', fileName: '' });

  useEffect(() => {
    if (id) {
      const fetchReference = async () => {
        try {
          const response = await axios.get(`${API_URL}/dataroom/${id}`);
          setReference(response.data);
        } catch (error) {
          console.error("Error fetching reference:", error);
        }
      };
    
      fetchReference();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReference({ ...reference, [name]: value });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', reference.Title);
    formData.append('content', reference.Content);
    if (file) {
      formData.append('file', file);
    }
    
    try {
      if (id) {
        await axios.put(`${API_URL}/dataroom/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_URL}/dataroom/new`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/reference');
    } catch (error) {
      console.error("Error saving reference:", error);
    }
  };
  

  const handleCancel = () => {
    navigate('/reference');
  };

  const handleDelete = async () => {
    try {
      if (id) {
        await axios.delete(`${API_URL}/dataroom/${id}`);
        navigate('/reference'); // 삭제 후 목록으로 이동
      }
    } catch (error) {
      console.error("Error deleting reference:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDownload = () => {
    if (reference.FileUrl) {
      const filename = reference.FileUrl.split('/').pop();
      window.location.href = `${API_URL}/dataroom/download/${filename}`;
    }
  };

  return (
    <div>
      <Navigation />
      <Container>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="Title"
              value={reference.Title || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              name="Content"
              rows={10}
              value={reference.Content || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile">
            <Form.Label>파일 업로드</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            {reference.FileUrl && (
              <div style={{ marginTop: '10px' }}>
                <Form.Text>업로드된 파일: {reference.FileUrl}</Form.Text>
                <Button
                  variant="link"
                  onClick={handleDownload}
                >
                  파일 다운로드
                </Button>
              </div>
            )}
          </Form.Group>

          <Button variant="primary" onClick={handleSave}>
            저장
          </Button>
          <Button variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
            취소
          </Button>
          {id && (
            <Button variant="danger" onClick={handleDelete} style={{ marginLeft: '10px' }}>
              삭제
            </Button>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default ReferenceDetail;
