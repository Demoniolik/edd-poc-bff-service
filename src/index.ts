import express from 'express';
import { Kafka } from 'kafkajs';
import HttpStatus from "http-status-codes";
import { Request, Response } from "express";

const app = express();
const kafkaClient = new Kafka({
    clientId: 'simpleApp',
    brokers: ['localhost:9092']
});

const simpleProducer = kafkaClient.producer();

const simpleProducerConnectToKafka = async () => {
    await simpleProducer.connect();
}

const testTopicName = "test";

app.get("/send/simple/message", (request: Request, response: Response) => {
    const kafkaRecord = {
        topic: testTopicName,
        messages: [{ value: "get request from bff" }]
    };

    simpleProducer.send(kafkaRecord)

    return response
        .status(HttpStatus.OK)
        .json({ "message": "message is sent" });
});

app.listen(3000, () => {
    simpleProducerConnectToKafka();
    console.log('Application started on port 3000!');
});