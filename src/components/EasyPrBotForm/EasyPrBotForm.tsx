import { Button, Form, Input, Select, Slider } from "antd";
import React, { FC } from "react";
import styles from "./EasyPrBotForm.module.css";

export const EasyPrBotForm: FC = (props) => {
  return (
    <Form className={styles.easyLayout}>
      <Form.Item label="Категории">
        <Select mode="multiple" allowClear placeholder="Выберите категории" />
      </Form.Item>
      <Form.Item label="Приход аудитории">
        <Slider range />
      </Form.Item>
      <Form.Item label="Цена рекламы">
        <Slider range />
      </Form.Item>
      <Form.Item label="Цена за подписчика">
        <Slider range />
      </Form.Item>
      <Form.Item label="Формат рекламы">
        <Select placeholder="Выберите формат рекламы" />
      </Form.Item>
      <Form.Item label="Название файла для сохранения">
        <Input placeholder="Введите название файла для сохранения" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Подобрать блогеров</Button>
      </Form.Item>
    </Form>
  );
};
