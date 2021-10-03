import { Button, Form, Input, Slider, Spin, Switch, Upload } from "antd";
import { FC, useState } from "react";
import styles from "./LabelUpBotForm.module.css";
import { InboxOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import fileDownload from "js-file-download";

export const LabelUpBotForm: FC = (props) => {
  const [form] = useForm();
  const [allChecked, setAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onAllChecked = (checked: boolean) => setAllChecked(checked);

  //TODO: Чтобы не костылить с тоглом Выбрать всех, достаточно после первой формы доставать количество блогеров и подставлять в Slider.
  const onFinish = (values: any) => {

    const formData = new FormData();
    formData.append('file', values?.file);
    formData.append('numFirstBloger', allChecked ? "-1" : `${values?.blogersInterval?.[0]}`);
    formData.append('numLastBloger', allChecked ? "-1" : `${values?.blogersInterval?.[1]}`);
    formData.append('apiHash', values?.apiHash);
    formData.append('apiId', values?.apiId);
    formData.append('phone', values?.phone);

    setIsLoading(true);
    axios.post('https://find-blogers-api.herokuapp.com/analyzeBlogers/', formData, {headers: {
      "Content-Type": "multipart/form-data",
    }}).then((res) => fileDownload(res?.data, 'labelup.xlsx')).finally(() => setIsLoading(false));
  };

  return (
    <Form form={form} className={styles.labelupLayout} onFinish={onFinish} initialValues={{apiHash: "59383793f893b510b7ccd28e5d92c674", apiId:"6288850", phone: "+79150865215"}}>
      <Spin spinning={isLoading}>
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
      </Spin>
    </Form>
  );
};
