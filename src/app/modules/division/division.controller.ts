import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { DivisionService } from "./division.services";



// create division
const createDivision = catchAsync(async (req: Request, res: Response) => {

    const result = await DivisionService.createDivision(req.body);

    sendResponse(res, {
        statusCode:httpStatus.CREATED ,
        success: true,
        message: "Division created",
        data: result,
    });
});


// get all division
const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.getAllDivisions();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
        meta: result.meta,
    });
});

// get single division
const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await DivisionService.getSingleDivision(slug);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
    });
});


// update division
const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await DivisionService.updateDivision(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division updated",
        data: result,
    });
});


// delete division
const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.deleteDivision(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division deleted",
        data: result,
    });
});





export const DivisionController = {
     createDivision,
     getAllDivisions,
     getSingleDivision,
     updateDivision,
     deleteDivision,
}