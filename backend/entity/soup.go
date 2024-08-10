package entity

import (

	"gorm.io/gorm"

)

type Soup struct {

	gorm.Model
    SoupID 		string 			`json:"soup_id"`
    Name   		string 			`json:"name"`

}