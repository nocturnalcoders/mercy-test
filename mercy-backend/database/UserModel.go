package database

import (
	"time"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID            int64     `gorm:"primary_key;auto_increment" json:"id"`
	NRIC          string    `gorm:"size:200;unique" json:"nric"`
	WalletAddress string    `gorm:"size:3000" json:"walletAddress"`
	CreatedAt     time.Time `json:"created_at,omitempty"`
	UpdatedAt     time.Time `json:"updated_at,omitempty"`
}

func (user *User) TableName() string {
	return "user"
}

func (user *User) ResponseMap() map[string]interface{} {
	resp := make(map[string]interface{})
	resp["id"] = user.ID
	resp["nric"] = user.NRIC
	resp["walletAddress"] = user.WalletAddress
	resp["created_at"] = user.CreatedAt
	resp["updated_at"] = user.UpdatedAt
	return resp
}

type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func ErrorJSON(c *gin.Context, statusCode int, data interface{}) {
	c.JSON(statusCode, gin.H{"error": data})
}

func SuccessJSON(c *gin.Context, statusCode int, data interface{}) {
	c.JSON(statusCode, gin.H{"message": data})
}
