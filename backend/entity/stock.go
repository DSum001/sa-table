package entity

import (
	"time"

	"gorm.io/gorm"
)

type Stock struct {

	gorm.Model

	Quantity 		uint 		`json:"quantity"`

	Price 			float64 	`json:"price"`

	DateIn 			time.Time 	`json:"date_in"`

	ExpirationDate 	time.Time 	`json:"expiration_date"`

	Status			string		`json:"status"`

	ProductID 		uint
	Product 		Product 	`gorm:"foriegnKey:ProductID"`

	SupplierID 		uint
	Supplier 		Supplier 	`gorm:"foriegnKey:SupplierID"`

	EmployeeID 		uint
	Employee 		Employee 	`gorm:"foriegnKey:EmployeeID"`

}