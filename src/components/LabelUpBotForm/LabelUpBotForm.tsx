import { Button, Checkbox, Form, Slider, Upload } from "antd";
import React, { FC } from "react";
import styles from "./LabelUpBotForm.module.css";
import { InboxOutlined } from "@ant-design/icons";

export const LabelUpBotForm: FC = (props) => {
  return (
    <Form className={styles.labelupLayout}>
      <Form.Item label="Файл для анализа">
        <Upload.Dragger>
          <InboxOutlined />
          <p>Загрузите файл</p>
        </Upload.Dragger>
      </Form.Item>
      <Form.Item label="Выбрать всех">
        <Checkbox />
      </Form.Item>
      <Form.Item label="Диапазон блогеров">
        <Slider />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Проанализировать блогеров</Button>
      </Form.Item>
    </Form>
  );
};
