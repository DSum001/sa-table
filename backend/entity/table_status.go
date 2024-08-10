package entity

import (

	"time"
	"gorm.io/gorm"

)

type StatusTable struct {

    StatusID 	string 			`gorm:"primarykey" json:"status_id"`
    Name 		string 			`json:"name"`

	CreatedAt 	time.Time
	UpdatedAt 	time.Time
	DeletedAt 	gorm.DeletedAt 	`gorm:"index"`

}