package entity

import "gorm.io/gorm"

type TableCapacity struct {
	gorm.Model
    MinCustomer  int `json:"min"`
	MaxCustomer  int `json:"max"` 
	Tables []Table `gorm:"foreignKey:TableCapacityID"`
}