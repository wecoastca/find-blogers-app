import { Steps } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import "./App.css";
import { EasyPrBotForm } from "./components/EasyPrBotForm";
import { LabelUpBotForm } from "./components/LabelUpBotForm";

const { Step } = Steps;

function App() {
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header style={{ backgroundColor: "white", paddingTop: "10px" }}>
        <Steps current={1}>
          <Step title="Easy PR bot" />
          <Step title="Label Up Bot" />
        </Steps>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "50px",
        }}
      >
        <EasyPrBotForm />
        <LabelUpBotForm />
      </Content>
    </Layout>
  );
}

export default App;
