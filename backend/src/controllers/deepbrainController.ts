import {Request, Response, NextFunction} from "express";

/**
 * ModelList 받아오기
 */
const getModelList = async (req : Request, res : Response, next : NextFunction) => {
    const { appId, platform, isClientToken, token, uuid, sdk_v, clientHostname } = req.body;

    try {
        console.log('----getModelList Start-----');
    } catch (err) {
        next(err);
    }
}

export default { getModelList };