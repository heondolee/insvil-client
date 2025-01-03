import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import Navigation from '../Alayouts/Navigation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터의 기본 스타일

const API_URL = process.env.REACT_APP_API_URL;

const ReferenceDetail = () => {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [reference, setReference] = useState({ Title: '', Content: '', FileUrl: '', FileName: '' });
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (id) {
      const fetchReference = async () => {
        try {
          const response = await axios.get(`${API_URL}/dataroom/${id}`);
          
          // 이전에 저장된 텍스트가 순수 텍스트일 수 있으므로 이를 처리
          const processedContent = convertNewlinesToBreaks(response.data.Content);
          setReference({ ...response.data, Content: processedContent });
        } catch (error) {
          console.error("Error fetching reference:", error);
        } finally {
          setLoading(false); // 데이터 로딩 후 로딩 상태 false로 변경
        }
      };
    
      fetchReference();
    } else {
      setLoading(false); // id가 없으면 로딩 상태를 바로 false로 설정
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReference({ ...reference, [name]: value });
  };

  const handleContentChange = (Content) => {
    setReference({ ...reference, Content });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('Title', reference.Title);
    formData.append('Content', reference.Content);
    if (file) {
      formData.append('file', file);
    }
    
    try {
      if (id) {
        await axios.put(`${API_URL}/dataroom/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        if (!reference.Title) {
          return window.alert("제목을 입력해주세요.");
        }
        if (!reference.Content) {
          return window.alert("내용을 입력해주세요.");
        }
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
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
          await axios.delete(`${API_URL}/dataroom/${id}`);
          window.alert("삭제되었습니다.");
          navigate('/reference'); // 삭제 후 목록으로 이동
        }
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

  // 줄바꿈 문자를 <br>로 변환하는 함수
  const convertNewlinesToBreaks = (text) => {
    if (text && typeof text === 'string') {
      return text.replace(/\n/g, '<br/>');
    }
    return text;
  };

  if (loading) {
    return ( // 로딩 중일 때 보여줄 화면 
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return ( // 로딩이 끝나면 보여줄 화면
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
            <ReactQuill
              value={reference.Content || ''}
              onChange={handleContentChange}
              modules={{
                toolbar: [
                  [{ 'font': [] }],
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline'],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['clean']
                ]
              }}
              formats={[
                'font', 'header', 'bold', 'italic', 'underline',
                'color', 'background', 'list', 'bullet',
              ]}
              style={{ height: '500px' }}
            />
          </Form.Group>
          <Form.Group controlId="formFile">
          <Form.Label style={{ margin: '4rem 0rem 1rem 0rem' }}>파일 업로드</Form.Label>
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
