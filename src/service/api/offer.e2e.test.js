"use strict";

const express = require(`express`);
const request = require(`supertest`);

const offer = require(`./offer`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": "htVTQv",
    "category": [
      "Книги"
    ],
    "description": "Если найдёте дешевле — сброшу цену.  Это настоящая находка для коллекционера! Пользовались бережно и только по большим праздникам.",
    "picture": "item18936.jpg",
    "title": "Куплю антиквариат",
    "type": "OFFER",
    "sum": 49195,
    "comments": [
      {
        "id": "pC1JkL",
        "text": "Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Совсем немного..."
      }
    ]
  },
  {
    "id": "V0ixNb",
    "category": [
      ""
    ],
    "description": "Даю недельную гарантию. Таких предложений больше нет! Продаю с болью в сердце... При покупке с меня бесплатная доставка в черте города.",
    "picture": "item44335.jpg",
    "title": "Куплю породистого кота",
    "type": "OFFER",
    "sum": 94589,
    "comments": [
      {
        "id": "fBh1k6",
        "text": " Оплата наличными или перевод на карту?"
      },
      {
        "id": "z_vqfx",
        "text": "А сколько игр в комплекте?"
      },
      {
        "id": "mOijaC",
        "text": " Почему в таком ужасном состоянии? А сколько игр в комплекте?"
      }
    ]
  },
  {
    "id": "5BTuJS",
    "category": [
      "Еда"
    ],
    "description": "Продаю с болью в сердце... Это настоящая находка для коллекционера! Таких предложений больше нет! Пользовались бережно и только по большим праздникам.",
    "picture": "item45150.jpg",
    "title": "",
    "type": "OFFER",
    "sum": 89752,
    "comments": [
      {
        "id": "haQyrf",
        "text": "С чем связана продажа? Почему так дешёво?  Совсем немного..."
      },
      {
        "id": "F6N64w",
        "text": "Оплата наличными или перевод на карту?"
      },
      {
        "id": "1DvvSg",
        "text": "А сколько игр в комплекте?  Продаю в связи с переездом. Отрываю от сердца."
      }
    ]
  },
  {
    "id": "BtLGCz",
    "category": [
      "Книги"
    ],
    "description": "Пользовались бережно и только по большим праздникам. Продаю с болью в сердце... Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.",
    "picture": "item54724.jpg",
    "title": "Продам книги Стивена Кинга",
    "type": "OFFER",
    "sum": 72317,
    "comments": [
      {
        "id": "ycTgXs",
        "text": "С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту? А сколько игр в комплекте?"
      },
      {
        "id": "eXRatn",
        "text": "Вы что?! В магазине дешевле. "
      },
      {
        "id": "V-wttW",
        "text": "Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?"
      },
      {
        "id": "lDhrbC",
        "text": "Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту?"
      }
    ]
  },
  {
    "id": "4og-aK",
    "category": [
      "Разное"
    ],
    "description": "Таких предложений больше нет! Даю недельную гарантию. Если товар не понравится — верну всё до последней копейки. Если найдёте дешевле — сброшу цену.",
    "picture": "item58729.jpg",
    "title": "Продам отличную подборку фильмов на VHS",
    "type": "SALE",
    "sum": 45248,
    "comments": [
      {
        "id": "jD5wU9",
        "text": "Продаю в связи с переездом. Отрываю от сердца."
      },
      {
        "id": "jJT43l",
        "text": "Почему в таком ужасном состоянии?"
      },
      {
        "id": "KPEpup",
        "text": "А где блок питания? А сколько игр в комплекте?"
      }
    ]
  }
];


const createAPI = () => {
  const app = express();
  const clonedData = JSON.parse(JSON.stringify(mockData));
  console.log(clonedData)
  app.use(express.json());
  offer(app, new OfferService(clonedData), new CommentService());
  return app
};

/*describe(`API returns a list of all offers`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(5));

  test(`First offer's id equals "htVTQv"`, () => expect(response.body[0].id).toBe(`htVTQv`));

});

describe(`API returns an offer with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/htVTQv`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Куплю антиквариат"`, () => expect(response.body.title).toBe(`Куплю антиквариат`));

});*/

describe(`API creates an offer if data is valid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent offer`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/htVTQv`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/htVTQv`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

  test(`API returns status code 404 when trying to change non-existent offer`, () => {

    const app = createAPI();

    const validOffer = {
      category: `Это`,
      title: `валидный`,
      description: `объект`,
      picture: `объявления`,
      type: `однако`,
      sum: 404
    };

    return request(app)
      .put(`/offers/NOEXST`)
      .send(validOffer)
      .expect(HttpCode.NOT_FOUND);
  });

  test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/V0ixNb`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`V0ixNb`));

  test(`Offer count is 4 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => {
      console.log(res.body);
      return expect(res.body.length).toBe(4);
    })
  );

});

test(`API refuses to delete non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/GxdTgz/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
