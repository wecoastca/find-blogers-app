import { Button, Form, Input, Slider, Switch, Upload } from "antd";
import { FC, useState } from "react";
import styles from "./LabelUpBotForm.module.css";
import { InboxOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";

export const LabelUpBotForm: FC = (props) => {
  const [form] = useForm();
  const [allChecked, setAllChecked] = useState(false);

  const onAllChecked = (checked: boolean) => setAllChecked(checked);

  const onFinish = (values: any) => {
    const { blogersInterval, ...otherValues } = values;
    console.log({
      blogersInterval: allChecked ? -1 : values?.blogersInterval,
      ...otherValues,
    });
    //fetch
  };
  return (
    <Form form={form} className={styles.labelupLayout} onFinish={onFinish}>
      <Form.Item label="Файл для анализа" name="file">
        <Upload.Dragger
          beforeUpload={() => false}
          onChange={(info) =>
            form?.setFieldsValue({
              file:
                info?.file?.originFileObj || info?.fileList?.[0]?.originFileObj,
            })
          }
        >
          <InboxOutlined />
          <p>Загрузите файл</p>
        </Upload.Dragger>
      </Form.Item>
      <Form.Item label="Выбрать всех">
        <Switch checked={allChecked} onChange={onAllChecked} />
      </Form.Item>
      <Form.Item label="Диапазон блогеров" name="blogersInterval">
        <Slider range max={1000} disabled={allChecked} />
      </Form.Item>
      <Form.Item label="Хэш Апи" name="apiHash">
        <Input placeholder="Введите уникальный хэш API телеграмма" />
      </Form.Item>
      <Form.Item label="Уникальный идентификатор Апи" name="apiId">
        <Input placeholder="Введите уникальный ID API телеграмма" />
      </Form.Item>
      <Form.Item label="Номер телефона" name="phone">
        <Input placeholder="Введите ваш номер телефона из телеграмма" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Проанализировать блогеров
        </Button>
      </Form.Item>
    </Form>
  );
};
