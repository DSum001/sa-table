package entity

import (
	"gorm.io/gorm"
)

type Package struct {

	gorm.Model
	Name      string 	`json:"name"`
	Price     int    	`json:"price"`
	Point     int 		`json:"point"`
	
}
