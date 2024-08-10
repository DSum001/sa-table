package entity

import (

	"gorm.io/gorm"

)

type Package struct {

	gorm.Model
    PackageID 	uint 			`gorm:"primarykey" json:"package_id"`
    Name      	string 			`json:"name"`
	Price       int             `json:"price"`

}