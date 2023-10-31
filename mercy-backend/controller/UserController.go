package controller

import (
	"goenv/database"
	"goenv/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserControllerStruct struct {
	service service.UserServiceStruct
}

func UserController(s service.UserServiceStruct) UserControllerStruct {
	return UserControllerStruct{
		service: s,
	}
}

func (controller *UserControllerStruct) AddUser(ctx *gin.Context) {
	var user database.User
	ctx.ShouldBindJSON(&user)

	err := controller.service.Save(user)
	if err != nil {
		database.ErrorJSON(ctx, http.StatusBadRequest, "Failed ")
		return
	}
	database.SuccessJSON(ctx, http.StatusCreated, "Successfully")
}

func (controller UserControllerStruct) GetUser(ctx *gin.Context) {
	var owners database.User

	keyword := ctx.Query("keyword")

	data, total, err := controller.service.FindAll(owners, keyword)

	if err != nil {
		database.ErrorJSON(ctx, http.StatusBadRequest, "Failed ")
		return
	}
	respArr := make([]map[string]interface{}, 0, 0)

	for _, n := range *data {
		resp := n.ResponseMap()
		respArr = append(respArr, resp)
	}

	ctx.JSON(http.StatusOK, &database.Response{
		Success: true,
		Message: "User result set",
		Data: map[string]interface{}{
			"rows":       respArr,
			"total_rows": total,
		}})
}
