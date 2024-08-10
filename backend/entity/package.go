package entity

import (

	"gorm.io/gorm"

)

type Package struct {

	gorm.Model
    PackageID 	string 			`gorm:"primarykey" json:"package_id"`
    Name      	string 			`json:"name"`

}