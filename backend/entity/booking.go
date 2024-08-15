package entity

import (

    "time"
    "gorm.io/gorm"

)

type Booking struct {

    gorm.Model
    BookingID         uint      `json:"booking_id"`
    NumberOfCustomers uint      `json:"number_of_customers"`
    Date              time.Time `json:"date"`

    Soup1ID           *uint     `json:"soup1_id"`
    Soup1             Soup      `gorm:"foreignKey:Soup1ID"`

    Soup2ID           *uint     `json:"soup2_id"`
    Soup2             Soup      `gorm:"foreignKey:Soup2ID"`

    Soup3ID           *uint     `json:"soup3_id"`
    Soup3             Soup      `gorm:"foreignKey:Soup3ID"`

    Soup4ID           *uint     `json:"soup4_id"`
    Soup4             Soup      `gorm:"foreignKey:Soup4ID"`

    PackageID         *uint     `json:"package_id"`
    Package           Package   `gorm:"foreignKey:PackageID"`

    TableID           *uint     `json:"table_id"`
    Table             Table     `gorm:"foreignKey:TableID"`

    MemberID          *uint     `json:"member_id"`
    Member            Member    `gorm:"foreignKey:MemberID"`

    EmployeeID        *uint     `json:"employee_id"`
    Employee          Employee  `gorm:"foreignKey:EmployeeID"`
    
}
