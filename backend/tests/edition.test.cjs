import { describe, it, expect, beforeAll, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import editionRoutes from '../routes/editionRoute.cjs';
import { Edition } from '../models/associations.cjs';

import * as editionService from '../services/editionService.cjs';

const mockAuthMiddleware = (req, res, next) => {
  req.user = { id: 1, name: 'Test User' };
  next();
};

const app = express();
app.use(bodyParser.json());
app.use("/", mockAuthMiddleware, editionRoutes);

beforeAll(async () => {
  await Edition.sync({ force: true });
});

describe("POST /", () => {
  it("should create a new edition and return it", async () => {
    const res = await request(app)
      .post("/")
      .send({ edition: "2025" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.edition).toBe("2025");
  });

  it("should return 500 if creation fails", async () => {
    vi.spyOn(editionService, 'createEdition').mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/")
      .send({ edition: "broken" });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("DB error");

    // ⬇️ Clean up the mock
    editionService.createEdition.mockRestore();
  });
});
