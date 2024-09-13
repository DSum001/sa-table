package entity

import "gorm.io/gorm"

type BookingSoup struct {
    gorm.Model
    BookingID uint `json:"booking_id"`
    Booking   Booking `json:"booking" gorm:"foreignKey:BookingID"`
    SoupID    uint `json:"soup_id"`
    Soup      Soup `json:"soup" gorm:"foreignKey:SoupID"`
}
