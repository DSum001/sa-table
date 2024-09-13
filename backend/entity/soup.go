package entity

import "gorm.io/gorm"

type Soup struct {
    gorm.Model
    Name     string    `json:"name"`
    Price    int       `json:"price"`
    Bookings []Booking `json:"bookings" gorm:"many2many:booking_soups"`
}