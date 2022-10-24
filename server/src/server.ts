import express from "express";
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertTimeStringToMinutes } from "./utils/convert-time-string-to-minutes";
import { convertMinutesNumberToString } from "./utils/convert-minutes-number-to-string";

const app = express();
app.use(express.json());
app.use(cors())// colocar URL da aplicacao final para prmitir somente ela fazer requisições {orgin: 'https:felipe.com.br'}
const prisma = new PrismaClient();

app.get('/games', async (request, response)=>{
    const games = await prisma.game.findMany({
        include: {
            _count:{
                select:{
                    ads: true,
                }
            }
        }
    });

    return response.json(games);
});

app.post('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id;
    const body = request.body;

    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            discord: body.discord,
            Whatsapp: body.Whatsapp,
            instagram: body.instagram,
            weekDays: body.weekDays.join(','),
            enableVoiceChannel: body.enableVoiceChannel,
            hourStart: convertTimeStringToMinutes(body.hourStart),
            hourEnd: convertTimeStringToMinutes(body.hourEnd),
            elo: body.elo,
        }
    });

    return response.json(ad);
});

app.get('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            enableVoiceChannel: true,
            hourStart: true,
            hourEnd: true,
            elo: true,
        },
        where:{
            gameId
        },
        orderBy:{
            createdAt: "desc"
        }
    });

    return response.json(ads.map(ad =>{
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesNumberToString(ad.hourStart),
            hourEnd: convertMinutesNumberToString(ad.hourEnd),
        }
    }));
});

app.get('/ads/:id/contact', async (request, response)=>{
    const adId = request.params.id;
    
    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
            Whatsapp: true,
            instagram: true,
        },
        where:{
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord , Whatsapp: ad.Whatsapp, instagram: ad.instagram
    });
});

app.listen(3333);