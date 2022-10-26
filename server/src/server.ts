import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

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

app.get("/summoner/:summonerName", async (request, response) => { //saber se existe e pegar ppuid
    var resposeTotal:any = {}
    var summonerName = request.params.summonerName;

    const result = dotenv.config();
    if (result.error) {
        throw result.error;
    }
    const keys:any = result.parsed;

    var ApiCallString = keys['LOL_URL_BR1'] + keys['LOL_BY_NAME'] + `/${encodeURI(summonerName)}` + "?api_key=" + keys['LOL_KEY'];
    await axios.get(ApiCallString).then((res)=>{
        resposeTotal['id'] = res.data.id;
        resposeTotal['accountId'] = res.data.accountId;
        resposeTotal['name'] = res.data.name;
        resposeTotal['profileIconId'] = res.data.profileIconId;
        resposeTotal['summonerLevel'] = res.data.summonerLevel;
    });

    ApiCallString = keys['LOL_URL_BR1'] + keys['LOL_MASTERY'] + `/${resposeTotal.id}` + "?api_key=" + keys['LOL_KEY'];
    console.log(ApiCallString);
    await axios.get(ApiCallString).then((res)=>{
        resposeTotal['top3_mastery_champions'] = res.data.slice(0, 3);
    });

    ApiCallString = keys['LOL_URL_BR1'] + keys['LOL_ELO'] +`/${resposeTotal.id}` + "?api_key=" + keys['LOL_KEY'];
    console.log(ApiCallString);
    await axios.get(ApiCallString).then((res)=>{
        resposeTotal['elo'] = res.data;
        return response.json(resposeTotal);
    });
});

app.listen(3333);
