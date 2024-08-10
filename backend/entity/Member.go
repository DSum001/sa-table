package entity

import(

	"time"
	"gorm.io/gorm"

) 

type Member struct {

	gorm.Model
	MemberID  	uint 			`json:"member_id"`
	FirstName	string			`json:"first_name"`
	Lastname	string			`json:"last_name"`
	PhoneNumber	string			`json:"phone_number"`
	Point 		int				`json:"point"`
	RegiterDate	time.Time 		`json:"register_date"`

	EmployeeID	*uint			
	Employee	Employee		`gorm:"foreignKey:employee_id"`

}