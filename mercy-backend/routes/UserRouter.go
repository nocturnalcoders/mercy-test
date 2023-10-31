package routes

import (
	"goenv/controller"
	"goenv/environment"
)

type UserRouteStruct struct {
	Controller controller.UserControllerStruct
	Handler    environment.GinRouter
}

func UserRoute(
	controller controller.UserControllerStruct,
	handler environment.GinRouter,

) UserRouteStruct {
	return UserRouteStruct{
		Controller: controller,
		Handler:    handler,
	}
}

func (router UserRouteStruct) Setup() {
	api := router.Handler.Gin.Group("/api/v1")
	{
		api.POST("/", router.Controller.AddUser)
		api.GET("/:address", router.Controller.GetUser)
	}
}
