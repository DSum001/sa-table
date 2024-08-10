package main

import (

	"github.com/DSum001/sa-table/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	
)

func main() {

	db, err := gorm.Open(sqlite.Open("sa-table.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}


	db.AutoMigrate(
		&entity.Booking{}, 
		&entity.Employee{}, 
		&entity.Member{}, 
		&entity.Package{}, 
		&entity.Soup{}, 
		&entity.Table{}, 
		&entity.TableStatus{})

}