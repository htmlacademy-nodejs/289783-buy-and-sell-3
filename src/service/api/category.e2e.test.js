"use strict";

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const CategoryService = require(`../data-service/category`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": "ABBLqo",
    "category": [
      "Игры"
    ],
    "description": "Если товар не понравится — верну всё до последней копейки. Таких предложений больше нет!  Товар качественный, зуб даю",
    "picture": "item80646.jpg",
    "title": "Продам новую приставку Sony Playstation 5",
    "type": "OFFER",
    "sum": 45017,
    "comments": [
      {
        "id": "jEAsEo",
        "text": "С чем связана продажа? Почему так дешёво? "
      },
      {
        "id": "-7yZ_4",
        "text": "Совсем немного..."
      }
    ]
  },
  {
    "id": "e1Ya_0",
    "category": [
      "Животные"
    ],
    "description": "Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары. Если найдёте дешевле — сброшу цену.",
    "picture": "item80911.jpg",
    "title": "Куплю породистого кота",
    "type": "OFFER",
    "sum": 20928,
    "comments": [
      {
        "id": "u9E0bv",
        "text": "А где блок питания?"
      },
      {
        "id": "lUQfGD",
        "text": "Вы что?! В магазине дешевле.  А сколько игр в комплекте?"
      },
      {
        "id": "KxQkr2",
        "text": "С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?"
      },
      {
        "id": "4_l6PF",
        "text": "Неплохо, но дорого.  Оплата наличными или перевод на карту?"
      }
    ]
  },
  {
    "id": "o3AR6B",
    "category": [
      "Посуда"
    ],
    "description": "Таких предложений больше нет! Продаю с болью в сердце...  Бонусом отдам все аксессуары.",
    "picture": "item43697.jpg",
    "title": "Продам книги Стивена Кинга",
    "type": "OFFER",
    "sum": 86222,
    "comments": [
      {
        "id": "BMZTeh",
        "text": "А где блок питания? Неплохо, но дорого. Почему в таком ужасном состоянии?"
      },
      {
        "id": "srbYp9",
        "text": "Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?"
      },
      {
        "id": "8tJVkT",
        "text": "Вы что?! В магазине дешевле. А сколько игр в комплекте? "
      }
    ]
  },
  {
    "id": "wxH4Xm",
    "category": [
      "Животные"
    ],
    "description": "Бонусом отдам все аксессуары. Пользовались бережно и только по большим праздникам. Даю недельную гарантию. Продаю с болью в сердце...",
    "picture": "item96894.jpg",
    "title": "Куплю породистого кота",
    "type": "SALE",
    "sum": 91543,
    "comments": [
      {
        "id": "DQiGDb",
        "text": "Почему в таком ужасном состоянии? "
      },
      {
        "id": "6KNmb0",
        "text": "Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Вы что?! В магазине дешевле."
      },
      {
        "id": "vL65qv",
        "text": "Почему в таком ужасном состоянии?"
      }
    ]
  },
  {
    "id": "TDKte3",
    "category": [
      "Еда"
    ],
    "description": "Если найдёте дешевле — сброшу цену. Продаю с болью в сердце... Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города.",
    "picture": "item97012.jpg",
    "title": "Куплю антиквариат",
    "type": "OFFER",
    "sum": 41121,
    "comments": [
      {
        "id": "dtV8bT",
        "text": "А где блок питания? Неплохо, но дорого. Оплата наличными или перевод на карту?"
      },
      {
        "id": "PtQKFX",
        "text": "Продаю в связи с переездом. Отрываю от сердца. "
      },
      {
        "id": "Z5X3dY",
        "text": "А сколько игр в комплекте? Совсем немного... С чем связана продажа? Почему так дешёво?"
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new CategoryService(mockData));

describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 categories`, () => expect(response.body.length).toBe(4));

  test(`Category names are "Игры", "Животные", "Посуда", "Еда"`,
    () => expect(response.body).toEqual(
      expect.arrayContaining([`Игры`, `Животные`, `Посуда`, `Еда`])
    )
  );

});
