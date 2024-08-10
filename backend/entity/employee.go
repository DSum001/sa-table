package entity

import(

	"time"
	"gorm.io/gorm"

) 

type Employee struct{

	gorm.Model
	EmployeeID   	string 		`json:"employee_id"`
	FirstName		string		`json:"first_name"`
	LastName		string		`json:"last_name"`
	Username		string		`json:"username"`
	Password		string		`json:"password"`
	RegiterDate		time.Time	`json:"register_date"`

}