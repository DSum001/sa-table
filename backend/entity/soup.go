package entity

import (

	"gorm.io/gorm"

)

type Soup struct {

	gorm.Model
    SoupID 		uint 			`json:"soup_id"`
    Name   		string 			`json:"name"`
	Price       int             `json:"price"`

}