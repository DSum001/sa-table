package entity

import (

    "time"
    "gorm.io/gorm"

)

type Booking struct {

    gorm.Model
    BookingID       	uint        `json:"booking_id"`
    NumberOfCustomers 	uint      	`json:"number_of_customers"`
    Date            	time.Time 	`json:"date"`

	Soup1ID				[]Soup      `gorm:"foreignKey:soup_id"`
    Soup2ID				[]Soup      `gorm:"foreignKey:soup_id"`
    
	PackageID           []Package   `gorm:"foreignKey:package_id"`

    TableID         	*uint
	Table 				Table 	    `gorm:"foreignKey:table_id"`

    MemberID        	[]Member    `gorm:"foreignKey:member_id"`

    EmployeeID			[]Employee  `gorm:"foreignKey:employee_id"`

}
