"use strict";

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const SearchService = require(`../data-service/search`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": "oQoguM",
    "category": [
      "Книги"
    ],
    "description": "При покупке с меня бесплатная доставка в черте города. Если товар не понравится — верну всё до последней копейки. Если найдёте дешевле — сброшу цену. Товар качественный, зуб даю",
    "picture": "item20393.jpg",
    "title": "Куплю слона",
    "type": "OFFER",
    "sum": 8851,
    "comments": [
      {
        "id": "93VuiW",
        "text": "Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца."
      },
      {
        "id": "GivQcA",
        "text": "А сколько игр в комплекте?"
      },
      {
        "id": "fBJDCX",
        "text": "Вы что?! В магазине дешевле. Совсем немного..."
      }
    ]
  },
  {
    "id": "1mk50e",
    "category": [
      "Журналы"
    ],
    "description": "Бонусом отдам все аксессуары. Таких предложений больше нет! Товар в отличном состоянии. ",
    "picture": "item79656.jpg",
    "title": "Продам отличную подборку фильмов на VHS",
    "type": "OFFER",
    "sum": 53115,
    "comments": [
      {
        "id": "0zMkm6",
        "text": " Почему в таком ужасном состоянии? Совсем немного..."
      },
      {
        "id": "McTrM1",
        "text": "А сколько игр в комплекте?"
      }
    ]
  },
  {
    "id": "mQJ6eQ",
    "category": [
      "Посуда"
    ],
    "description": "Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Таких предложений больше нет! Бонусом отдам все аксессуары.",
    "picture": "item55925.jpg",
    "title": "Куплю соль",
    "type": "OFFER",
    "sum": 81660,
    "comments": [
      {
        "id": "b55_Eh",
        "text": "Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво?"
      },
      {
        "id": "0IMzBS",
        "text": "Совсем немного... Неплохо, но дорого."
      }
    ]
  },
  {
    "id": "a6dt0e",
    "category": [
      "Куличики"
    ],
    "description": "Даю недельную гарантию. При покупке с меня бесплатная доставка в черте города. Товар качественный, зуб даю ",
    "picture": "item60818.jpg",
    "title": "",
    "type": "SALE",
    "sum": 27672,
    "comments": [
      {
        "id": "zSRC8t",
        "text": ""
      }
    ]
  },
  {
    "id": "jYX_DU",
    "category": [
      ""
    ],
    "description": " Если найдёте дешевле — сброшу цену. Это настоящая находка для коллекционера! Товар в отличном состоянии.",
    "picture": "item42683.jpg",
    "title": "Продам слона",
    "type": "OFFER",
    "sum": 8825,
    "comments": [
      {
        "id": "35yZdJ",
        "text": "Вы что?! В магазине дешевле. А где блок питания? Продаю в связи с переездом. Отрываю от сердца."
      },
      {
        "id": "kWLzrQ",
        "text": " Неплохо, но дорого."
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new SearchService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Куплю слон`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 offer found`, () => expect(response.body.length).toBe(1));

  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`oQoguM`));

});

test(`API returns code 404 if nothing is found`,
  () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
  () => request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST)
);
