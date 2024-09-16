package entity

import "gorm.io/gorm"

type Employee struct {
	gorm.Model
	FirstName    string     `json:"first_name"`
	LastName     string     `json:"last_name"`
	Username     string     `json:"username"`
	Email        string     `json:"email"`
	PhoneNumber  string     `json:"phone_number"` // Updated to match `Member` model
	Password     string     `json:"password"`
	GenderID     uint       `json:"gender_id"`
	PositionID   uint       `json:"position_id"`

	Bookings     []Booking  `gorm:"foreignKey:EmployeeID"`
	Orders       []Order    `gorm:"foreignKey:EmployeeID"`
	Products     []Product  `gorm:"foreignKey:EmployeeID"`
}