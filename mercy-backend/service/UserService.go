package service

import (
	"goenv/database"
	"goenv/repository"
)

type UserServiceStruct struct {
	repository repository.UserRepositoryStruct
}

func UserService(repository repository.UserRepositoryStruct) UserServiceStruct {
	return UserServiceStruct{
		repository: repository,
	}
}

func (repository UserServiceStruct) Save(owner database.User) error {
	return repository.repository.Save(owner)
}

func (repository UserServiceStruct) FindAll(owner database.User, keyword string) (*[]database.User, int64, error) {
	return repository.repository.FindAll(owner, keyword)
}
