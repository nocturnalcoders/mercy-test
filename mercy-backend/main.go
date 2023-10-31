package main

import (
	"goenv/controller"
	"goenv/database"
	"goenv/environment"
	"goenv/repository"
	"goenv/routes"
	"goenv/service"
)

func init() {
	environment.LoadEnv()
}

func main() {
	router := environment.NewGinRouter()
	db := environment.Database()
	userRepository := repository.UserRepository(db)
	userService := service.UserService(userRepository)
	userController := controller.UserController(userService)
	userRoute := routes.UserRoute(userController, router)
	userRoute.Setup()
	db.DB.AutoMigrate(&database.User{})
	router.Gin.Run(":8000")
}
