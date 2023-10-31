package environment

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DatabaseStruct struct {
	DB *gorm.DB
}

func Database() DatabaseStruct {
	// USER := "postgres"
	// PASS := "benz"
	// HOST := "localhost"
	// DBNAME := "benz"

	dsn := "host=localhost user=postgres password=postgres dbname=user port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed connect to database!")

	}
	fmt.Println("Database connection established")
	return DatabaseStruct{
		DB: db,
	}

}
