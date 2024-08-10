package entity

import (

	"time"
	"gorm.io/gorm"

)

type Package struct {

    PackageID 	string 			`gorm:"primarykey" json:"package_id"`
    Name      	string 			`json:"name"`

	CreatedAt 	time.Time
	UpdatedAt 	time.Time
	DeletedAt 	gorm.DeletedAt 	`gorm:"index"`

}