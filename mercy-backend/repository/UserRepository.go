package repository

import (
	"goenv/database"
	"goenv/environment"
)

type UserRepositoryStruct struct {
	db environment.DatabaseStruct
}

func UserRepository(db environment.DatabaseStruct) UserRepositoryStruct {
	return UserRepositoryStruct{
		db: db,
	}
}

func (repository UserRepositoryStruct) Save(user database.User) error {
	return repository.db.DB.Create(&user).Error
}

func (repository UserRepositoryStruct) FindAll(user database.User, keyword string) (*[]database.User, int64, error) {
	var users []database.User
	var totalRows int64 = 0

	queryBuider := repository.db.DB.Order("created_at desc").Model(&database.User{})

	if keyword != "" {
		queryKeyword := "%" + keyword + "%"
		queryBuider = queryBuider.Where(
			repository.db.DB.Where("user.title LIKE ? ", queryKeyword))
	}

	err := queryBuider.
		Where(user).
		Find(&users).
		Count(&totalRows).Error
	return &users, totalRows, err
}
