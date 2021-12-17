import "./App.css";
import "antd/dist/antd.css";
import { Button, Col, Input, Row, Spin, Typography } from "antd";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

const URL_ENDPINT = "";

export const processTextAPI = (text) => {
  const config = {
    text: text,
  };

  return axios
    .post(URL_ENDPINT + "/process", config)
    .then((response) => {})
    .catch((response) => {
      console.log(response);
    });
};

function App() {
  const [text, setText] = useState(null);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const onChangeText = (e) => setText(e);

  const processText = () => {
    setSpinning(true);
    processTextAPI(text).then((result) => {
      setTimeout(() => {
        setSpinning(false);
        setResult(text);
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
