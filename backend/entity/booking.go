package entity

import (

    "time"
    "gorm.io/gorm"

)

type Booking struct {

    gorm.Model
    BookingID       	string      `json:"booking_id"`
    NumberOfCustomers 	uint      	`json:"number_of_customers"`
    Date            	time.Time 	`json:"date"`

	Soup1ID				*uint
    Soup1           	Soup 		`gorm:"foreignKey:soup_id"`
    Soup2ID				*uint
    Soup2           	Soup 		`gorm:"foreignKey:soup_id"`

	PackageID			*uint
    Package         	Package		`gorm:"foreignKey:package_id"`

    TableID         	*uint
	Table 				TableType 	`gorm:"foreignKey:table_id"`

    MemberID        	*uint 
	Member 				Member		`gorm:"foreignKey:member_id"`	

    EmployeeID			*string			
	Employee			Employee	`gorm:"foreignKey:employee_id"`

}
