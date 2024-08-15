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
	Rank			Rank		`gorm:"foreignKey: RankID"`
	
	// FK from Employee
	EmployceeID		*uint		
	Employee		Employee	`gorm:"foreignKey: EmployceeID"`

}