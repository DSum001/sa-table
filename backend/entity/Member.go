package entity

import "gorm.io/gorm"

type Member struct {
	gorm.Model
	FirstName   string     `json:"first_name"`
	LastName    string     `json:"last_name"`
	PhoneNumber string     `json:"phone_number"`
	Email       string     `json:"email"`

	// FK from Rank
	RankID      uint       `json:"rank_id"`
	Rank        Rank       `gorm:"foreignKey:RankID"`

	// FK from Employee
	EmployeeID  uint       `json:"employee_id"`
	Employee    Employee   `gorm:"foreignKey:EmployeeID"`
}