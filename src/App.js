import { Button, Col, Input, Row, Spin, Typography, Radio, Space } from "antd";

import { useState } from "react";

import axios from "axios";

import "./App.css";

import "antd/dist/antd.css";

const { Title } = Typography;

const URL_ENDPINT = "http://localhost:5000";

export const processTextAPI = (text, restore_tone, keep_special_character) => {
  const config = {
    string: text,
    restore_tone: restore_tone === "true",
    keep_special_character: keep_special_character === "true"
  };

  return axios
    .post(URL_ENDPINT + "/postData", config)
    .then((response) => {
      return response.data.result;
    })
    .catch((response) => {
      console.log(response);
    });
};

function App() {
  const [text, setText] = useState(null);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [a, setA] = useState("false");
  const [b, setB] = useState("false");

  const onChangeText = (e) => setText(e);

  const processText = () => {
    setSpinning(true);
    processTextAPI(text, a, b).then((result) => {
      setTimeout(() => {
        setSpinning(false);
        setResult(result);
      }, 2500);
    });
  };

  return (
    <div
      style={{
        margin: "50px",
      }}
    >
      <Spin spinning={spinning}>
        <Row type="flex" justify={"center"} align="middle">
          <Row justify="start">
            <Col span={24}>
              <Title>
                <Title level={2}>NLP</Title>
              </Title>
            </Col>
          </Row>
        </Row>

        <Row
          style={{ marginBottom: "20px" }}
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        >
          <Col span={12}>
            <Row>
              <div className="title">Giữ nguyên những câu có dấu sẵn trong câu?</div>
            </Row>
            <Row>
              <Radio.Group defaultValue="false">
                <Space direction="vertical" onChange={e => setA(e.target.value)}>
                  <Radio value="true">Yes</Radio>
                  <Radio value="false">No</Radio>
                </Space>
              </Radio.Group>
            </Row>
          </Col>
        </Row>

        <Row
          style={{ marginBottom: "20px" }}
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        >
          <Col span={12}>
            <Row>
              <div className="title">Giữ những ký tự lạ trong câu?</div>
            </Row>
            <Row>
              <Radio.Group defaultValue="false">
                <Space direction="vertical" onChange={e => setB(e.target.value)}>
                  <Radio value="true">Yes</Radio>
                  <Radio value="false">No</Radio>
                </Space>
              </Radio.Group>
            </Row>
          </Col>
        </Row>

        <Row
          style={{ marginBottom: "20px" }}
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        >
          <Col span={12}>
            <Row>
              <div className="title">Input:</div>
              <Input.TextArea
                className="ant-input ant-input-lg"
                rows={6}
                value={text}
                onChange={(e) => onChangeText(e.target.value)}
              />
            </Row>
          </Col>
        </Row>

        <Row
          style={{ marginBottom: "20px" }}
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        >
          <Col span={12}>
            <Row justify="center">
              <Button
                type="primary"
                size="large"
                shape="round"
                onClick={() => processText()}
              >
                Process
              </Button>
            </Row>
          </Col>
        </Row>

        <Row
          style={{ marginBottom: "20px" }}
          type="flex"
          justify="center"
          align="middle"
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        >
          <Col span={12}>
            <Row>
              <div className="title">Output:</div>
              <Input.TextArea
                className="ant-input ant-input-lg"
                rows={6}
                value={result}
                readOnly
              />
            </Row>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default App;
