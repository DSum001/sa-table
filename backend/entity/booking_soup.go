package entity

import "gorm.io/gorm"


type BookingSoup struct {

    gorm.Model
    BookingID uint    `gorm:"foreignKey:BookingID"`
    SoupID    uint    `gorm:"foreignKey:SoupID"`    
    Quantity  int
	
}
