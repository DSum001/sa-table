package entity

import (

	"time"

	"gorm.io/gorm"

)

type Employee struct {

	gorm.Model	

	FirstName 		string		`json:"frist_name"`

	LastName 		string		`json:"last_name"`

	Username 		string		`json:"username"`

	Email			string		`json:"email"`

	Password 		string		`json:"password"`

	Register_date 	time.Time	`json:"registr_date"`

	Gender_id 		uint		`json:"gender_id"`

	Position_id 	uint		`json:"position_id"`
	
	Booking 		[]Booking 	`gorm:"foreignKey:EmployeeID"`
	Order 			[]Order 	`gorm:"foreignKey:EmployeeID"`
	Product 		[]Product 	`gorm:"foreignKey:EmployeeID"`
	
}