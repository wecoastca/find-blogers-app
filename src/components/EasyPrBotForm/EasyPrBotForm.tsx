import { Button, Form, Input, Select, Slider, Spin } from "antd";
import axios from "axios";
import fileDownload from 'js-file-download';
import { FC, useState } from "react";
import styles from "./EasyPrBotForm.module.css";

const categories = [
  "Животные",
  "Изучение языков",
  "Нет темы",
  "Образование",
  "Спорт и фитнес",
  "Психология",
  "Продуктивность",
  "Здоровье",
  "Рукоделие",
  "интерьер и ремонт",
  "Ремонт и интерьер",
  "Бьюти",
  "Феминизм",
  "Семья",
  "реклама и пиар",
  "Бизнес",
  "Отношения",
  "Похудение",
  "Социальные темы",
  "Лайфстайл",
  "Саморазвитие",
  "Фильмы",
  "Секс",
  "Профессии (юрист",
  "Лайфхаки",
  "Мотивация",
  "Мамы",
  "Обработка фото",
  "ПП",
  "Мода",
  "Наука",
  "Рецепты и еда",
  "Эзотерика",
  "Природа и экология",
  "Дом",
  "Творчество и искусство",
  "Путешествия",
  "ЗОЖ",
  "Музыка",
  "Танцы",
  "Другая тема",
  "СММ",
  "дизайнер и т.д.)",
  "стиль и шоппинг",
  "Юмор",
  "Жизнь за границей",
  "Бодипозитив",
  "Книги",
  "Сад и огород",
  "Авто",
];

const adFormat = [
  {
    id: 1,
    name: "Сторис",
  },
  {
    id: 2,
    name: "Фото-пост",
  },
  {
    id: 3,
    name: "Видео-пост",
  },
  {
    id: 4,
    name: "Пост+сторис",
  },
  {
    id: 5,
    name: "Гив",
  },
];

export const EasyPrBotForm: FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = (values: any) => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: 'https://find-blogers-api.herokuapp.com/getBlogers/',
      responseType: 'blob',
      data: values
    }).then((res) => {
      fileDownload(res?.data, values?.filename);
    }).finally(() => setIsLoading(false));

  };

  return (
    <Form
      className={styles.easyLayout}
      initialValues={{
        filename: "my_podbor.xlsx",
      }}
      onFinish={onFinish}
    >
      <Spin spinning={isLoading}>
      <Form.Item label="Категории" name="categories">
        <Select mode="multiple" allowClear placeholder="Выберите категории">
          {categories?.map((x, index) => (
            <Select.Option key={index} value={x}>
              {x}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Приход аудитории" name="audienceArrival">
        <Slider range min={30} max={55920} />
      </Form.Item>
      <Form.Item label="Цена рекламы" name="adPrice">
        <Slider range min={450} max={98950} />
      </Form.Item>
      <Form.Item label="Цена за подписчика" name="subPrice">
        <Slider range min={5} max={391} />
      </Form.Item>
      <Form.Item label="Формат рекламы" name="adFormat">
        <Select placeholder="Выберите формат рекламы">
          {adFormat?.map((y) => (
            <Select.Option key={y.id} value={y.id}>
              {y.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Название файла для сохранения" name="filename">
        <Input placeholder="Введите название файла для сохранения" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Подобрать блогеров
        </Button>
      </Form.Item>
      </Spin>
    </Form>
  );
};
