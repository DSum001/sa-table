package entity

import "gorm.io/gorm"

type Employee struct {
    gorm.Model
    FirstName    string     `json:"first_name"`  // Fixed typo
    LastName     string     `json:"last_name"`
    Username     string     `json:"username"`
    Email        string     `json:"email"`
    Phone        string     `json:"phone_number"`
    Password     string     `json:"password"`
    GenderID     uint       `json:"gender_id"`
    PositionID   uint       `json:"position_id"`

    Bookings     []Booking  `gorm:"foreignKey:EmployeeID"`
    Orders       []Order    `gorm:"foreignKey:EmployeeID"`
    Products     []Product  `gorm:"foreignKey:EmployeeID"`
}
