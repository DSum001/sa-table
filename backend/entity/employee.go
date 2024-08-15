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
	Register_date 	time.Time	`json:"register_date"`
	Gender_id 		uint		`json:"gender_id"`
	Position_id 	uint		`json:"position_id"`
	
	Booking 		[]Booking 	`gorm:"foreignKey:employee_id"`
	Order 			[]Order 	`gorm:"foreignKey:employee_id"`
	Product 		[]Product 	`gorm:"foreignKey:employee_id"`
	
}