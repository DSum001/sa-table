package entity

import "gorm.io/gorm"

type Order_Product struct {
	gorm.Model
	Quantity    uint

	OrderID    *uint
	Orders       Order   `gorm:"foreignKey:OrderID"`

	ProductID  *uint
	Products     Product `gorm:"foreignKey:ProductID"`

	
	
}