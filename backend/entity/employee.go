package entity

import(

	"time"
	"gorm.io/gorm"

) 

type Employee struct{

	EmployeeID   	string 		`gorm:"primarykey" json:"employee_id"`
	FirstName		string		`json:"first_name"`
	Lastname		string		`json:"last_name"`
	Username		string		`json:"username"`
	Password		string		`json:"password"`
	RegiterDate		time.Time	`json:"register_date"`
	
	CreatedAt 		time.Time
	UpdatedAt 		time.Time
	DeletedAt 		gorm.DeletedAt 	`gorm:"index"`
}