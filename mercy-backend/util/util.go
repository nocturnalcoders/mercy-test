package util

import "fmt"

func FormatPostgresDSN(
	user string,
	pass string,
	host string,
	port string,
	dbname string,
) string {
	return fmt.Sprintf(
		"host=%s user=%s dbname=%s password=%s port=%s sslmode=disable TimeZone=Asia/Singapore",
		host, user, dbname, pass, port,
	)
}
