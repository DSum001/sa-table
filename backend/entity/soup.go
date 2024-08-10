package entity

import (

	"time"
	"gorm.io/gorm"

)

type Soup struct {

	gorm.Model
    SoupID 		string 			`gorm:"primarykey" json:"soup_id"`
    Name   		string 			`json:"name"`

	CreatedAt 	time.Time
	UpdatedAt 	time.Time
	DeletedAt 	gorm.DeletedAt 	`gorm:"index"`

}