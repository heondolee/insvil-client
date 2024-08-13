import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Navigation from './layouts/Navigation';

const API_URL = process.env.REACT_APP_API_URL;

const ReferenceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reference, setReference] = useState({ title: '', content: '' });

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
    try {
      if (id) {
        await axios.put(`${API_URL}/dataroom/${id}`, {
          title: reference.Title,
          content: reference.Content,
        });
      } else {
        await axios.post(`${API_URL}/dataroom/new`, {
          title: reference.Title,
          content: reference.Content,
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
