package entity

import (

	"gorm.io/gorm"
)

type Category struct {
	gorm.Model

	Category_Code_id   string ` json:"category_id"`

    CategoryName string `json:"category_name"`

	//Category 1 to 0..* Product

	Product []Product  `gorm:"foreignKey:CategoryID"`

	
}