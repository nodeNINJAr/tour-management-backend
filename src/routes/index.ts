import { Router } from "express"
import { UserRoutes } from "../app/modules/user/user.routes";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { TourRoutes } from "../app/modules/tour/tour.routes";
import { DivisionRoutes } from "../app/modules/division/division.routes";

export const router = Router();

const moduleRoutes = [
    {
        path:"/user",
        route:UserRoutes,
    },
     {
        path:"/auth",
        route:AuthRoutes,
    },
    {
        path:"/tour",
        route:TourRoutes,
    },
     {
        path:"/division",
        route:DivisionRoutes,
    }
]


moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route )
})