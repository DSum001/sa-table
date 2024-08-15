package entity

import(

	"gorm.io/gorm"

) 

type Member struct{

	gorm.Model
	FirstName		string		`json:"first_name"`
	LastName		string		`json:"last_name"`
	PhoneNumber		string		`json:"phone_number"`	
	Email 			string		`json:"email"`	

	// FK from Rank
	RankID			*uint
	Rank			Rank		`gorm:"foreignKey: rank_id"`
	
	// FK from Employee
	EmployeeID		*uint		
	Employee		Employee	`gorm:"foreignKey: employee_id"`

}